import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
  }).promise();


export async function getEvents() {
    const [rows] = await pool.query("SELECT * FROM events")
    return [rows]
}

export async function getLoginData(userId,password) {
  const sql = "SELECT * FROM login_credentials WHERE userId = ? AND passkey = ?";
  const [rows] = await pool.query(sql, [userId, password]);
  return [rows]
}
export async function getOrganizers() {
  const [rows] = await pool.query("SELECT * FROM organizer")
  return [rows]
}

export async function addOrganizer(userId) {
  console.log(typeof(userId))
  const sql = `INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('${userId}','abc','organizer');`
  // const values = [userId,'abc','organizer'];
  await pool.query(sql)
  return [{'default_password':'abc'}]
}

export async function removeOrganizer(userId) {
  // console.log(userId)
  const sql1 = `DELETE FROM organizer WHERE userID = ?;`
  const values = [userId];
  await pool.query(sql1, values)
  const sql2 = `DELETE FROM login_credentials WHERE userID = ?;`
  await pool.query(sql2, values)
}

export async function getParticipants(eventId) {
  const sql = `SELECT p.participant_id, s.username, s.student_name, c.college_name
  FROM participant p
  JOIN student s ON p.username = s.username
  JOIN college c ON s.college_id = c.college_id
  WHERE p.event_id = ?;`
  const values = [eventId];
  const [rows] = await pool.query(sql, values)
  return [rows]
}
export async function getVolunteers(eventId) {
  const sql = `SELECT v.volunteer_id, s.student_id, s.student_name, s.department FROM volunteer v JOIN student s ON v.student_id = s.username WHERE v.event_id = ? ;`
  const values = [eventId];
  const [rows] = await pool.query(sql, values)
  return [rows]
}
export async function getEventStatus(eventId) {
  const sql = `SELECT e.event_status FROM events e WHERE e.event_id = ?;`
  const values = [eventId];
  const [rows] = await pool.query(sql, values)
  return [rows]
}

export async function getStudentLogin(userId, password) {
  const sql = "SELECT * FROM student WHERE username = ? AND pass_word = ?";
  const [rows] = await pool.query(sql, [userId, password]);
  return [rows]
}

export async function getProfileDetails(userId, collegeId) {
  const sql = "SELECT * FROM student WHERE username = ? AND college_id = ?";
  const [rows] = await pool.query(sql, [userId, collegeId]);
  return [rows]
}

export async function RegisterEvent(userId, collegeId, eventId) {
  const sql = "INSERT INTO participant (participant_id, username, event_id, college_id, status) VALUES (CONCAT(?,?,?),?,?,?,?);";
  const [rows] = await pool.query(sql, [userId, collegeId,eventId,userId,eventId,collegeId,'registered']);
  return [rows]
}

export async function VolunteerEvent(userId,eventId) {
  const sql = "INSERT INTO volunteer (volunteer_id, student_id, event_id) VALUES (CONCAT(?,?),?,?);";
  const [rows] = await pool.query(sql, [userId,eventId,userId,eventId]);
  return [rows]
}

export async function StudentSignUp(userId,passkey,name,dept,college,ID) {
  const sql = "INSERT INTO student (username, pass_word, student_name, department, college_id, student_id) VALUES (?,?,?,?,(SELECT college_id FROM college WHERE college_name = ?),?);";
  const [rows] = await pool.query(sql, [userId,passkey,name,dept,college,ID]);
  return [rows]
}




export async function insertIntoLogisticsAndStudents(userId){
  await pool.query('DROP TRIGGER IF EXISTS logistics_trigger');
  await pool.query('DROP PROCEDURE IF EXISTS insert_into_logistics_and_students_proc');
  const sqlProcedure = `
  CREATE PROCEDURE insert_into_logistics_and_students_proc()
  BEGIN
    
      DECLARE v_accomodation_id INT;
      DECLARE v_food_id INT;

     
      SELECT a.accomodation_id INTO v_accomodation_id
      FROM accomodation a
      LEFT JOIN (
          SELECT accomodation_id, COUNT(*) AS logistics_count
          FROM logistics
          GROUP BY accomodation_id
      ) l ON a.accomodation_id = l.accomodation_id
      WHERE l.accomodation_id IS NULL OR l.logistics_count < a.max_capacity
      LIMIT 1;

      SELECT f.food_id INTO v_food_id
      FROM food f
      LEFT JOIN (
          SELECT food_id, COUNT(*) AS logistics_count
          FROM logistics
          GROUP BY food_id
      ) l ON f.food_id = l.food_id
      WHERE l.food_id IS NULL OR l.logistics_count < f.max_capacity
      LIMIT 1;

      
      SELECT v_accomodation_id AS accomodation_id_value, v_food_id AS food_id_value;

      
      INSERT INTO logistics (accomodation_id, food_id) VALUES (v_accomodation_id, v_food_id);

      
  END`;

  await pool.query(sqlProcedure);
  const sqlTrigger = `
  CREATE TRIGGER logistics_trigger
  AFTER INSERT ON logistics
  FOR EACH ROW
  BEGIN
  INSERT INTO logistics_students (logistics_id, student_id)
  VALUES (NEW.logistics_id, ?);
  END;
`;

await pool.query(sqlTrigger,[userId]);
const[rows]=await pool.query('CALL insert_into_logistics_and_students_proc();');


    
    /*const proc_call='CALL insert_into_logistics_and_students_proc();'
    await pool.query(proc_call);*/

    //const[rows]=await pool.query(sqlProcedure);
    //const[rows]=await pool.query(sqlTrigger,[userId]);
    return [rows];
}

