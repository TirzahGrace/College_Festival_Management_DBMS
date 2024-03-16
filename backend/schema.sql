DROP DATABASE IF EXISTS dbms1;
create database dbms1;
use dbms1;

CREATE TABLE events (
  event_id VARCHAR(100) PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_description TEXT,
  event_date DATE NOT NULL,
  max_participants INT,
  max_volunteers INT,
  event_status ENUM('live', 'completed', 'open','closed', 'cancelled')
);

INSERT INTO events (event_id, event_name, event_description, event_date, max_participants, max_volunteers, event_status) VALUES
  ('E001','Event1', 'Description for Event 1', '2024-03-01', 4, 2, 'live'),
  ('E002','Event2', 'Description for Event 2', '2024-03-05', 4, 2, 'live'),
  ('E003','Event3', 'Description for Event 3', '2024-03-10', 4, 3, 'live'),
  ('E004','Event4', 'Description for Event 4', '2024-03-15', 6, 5, 'live'),
  ('E005','Event5', 'Description for Event 5', '2024-03-20', 4, 2, 'live');


CREATE TABLE admin (
    userID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO admin (userID, name, email)
VALUES
('A001', 'John Doe', 'john@example.com'),
('A002', 'Jane Smith', 'jane@example.com'),
('A003', 'Alice Johnson', 'alice@example.com');

CREATE TABLE login_credentials (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(100) NOT NULL UNIQUE,
  passkey VARCHAR(100) NOT NULL,
  user_type ENUM('admin', 'organizer', 'student') NOT NULL
);

INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('A001', 'admin1', 'admin');
INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('A002', 'admin2', 'admin');
INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('A003', 'admin3', 'admin');
INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('OR001', 'org1', 'organizer');
INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('OR002', 'org2', 'organizer');
INSERT INTO login_credentials (userId, passkey, user_type) VALUES ('OR003', 'org3', 'organizer');

CREATE TABLE organizer (
    userID VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO organizer (userID, name, email)
VALUES
('OR001', 'John Smith', 'johnsm@example.com'),
('OR002', 'Sarah Johnson', 'sarah@example.com'),
('OR003', 'Michael Williams', 'michael@example.com');

CREATE TABLE college(
    college_id VARCHAR(100) PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    college_location VARCHAR(255)
);

INSERT INTO college (college_id,college_name, college_location) VALUES 
('C1','IITKGP', 'Kharagpur'),
('C2','IITB', 'Bombay'),
('C3','IITK', 'Kanpur');

CREATE TABLE accomodation(
    accomodation_id INT AUTO_INCREMENT PRIMARY KEY,
    venue_name VARCHAR(255) NOT NULL,
    max_capacity INT
  );

  CREATE TABLE food(
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    venue_name VARCHAR(255) NOT NULL,
    max_capacity INT

  );

  CREATE TABLE logistics(
    logistics_id INT AUTO_INCREMENT PRIMARY KEY,
    accomodation_id INT,
    food_id INT,
    FOREIGN KEY (accomodation_id) REFERENCES accomodation(accomodation_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
  );

CREATE TABLE student(
  username VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
  student_id VARCHAR(100) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  college_id VARCHAR(100) ,
  FOREIGN KEY (college_id) REFERENCES college(college_id),
  pass_word VARCHAR(255) NOT NULL
);

INSERT INTO student (student_id, student_name, department, college_id,username, pass_word) VALUES 
('S001', 'John Doe', 'Computer Science', 'C1', 'C1S001','pass1'),
('S002', 'Jane Smith', 'Electrical Engineering', 'C2', 'C2S002','pass2'),
('S003', 'Alice Johnson', 'Mathematics', 'C3', 'C3S003','pass3'),
('S004', 'Ankita Pradhan', 'Physics', 'C1', 'C1S004','pass4'),
('S1','Jane','CS','C1','abcd','aaaa');

CREATE TABLE logistics_students(
   logistics_id INT,
   student_id VARCHAR(100) NOT NULL,
   FOREIGN KEY (logistics_id) REFERENCES logistics(logistics_id),
   FOREIGN KEY (student_id) REFERENCES student(username),
   PRIMARY KEY (student_id,logistics_id)

);

CREATE TABLE participant(
  participant_id VARCHAR(100) NOT NULL PRIMARY KEY,
  event_id VARCHAR(100),
  username VARCHAR(100),
  college_id VARCHAR(100),
  status ENUM('won', 'lost', 'registered') NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (username) REFERENCES student(username),
  FOREIGN KEY (college_id) REFERENCES college(college_id)
);

INSERT INTO participant (participant_id, event_id,college_id, username, status) VALUES 
('P001', 'E001','C1', 'C1S001','registered'),
('P002', 'E002','C2','C2S002','registered'),
('P003', 'E003','C3', 'C3S003','registered');

CREATE TABLE volunteer (
    volunteer_id VARCHAR(100) PRIMARY KEY,
    student_id VARCHAR(100),
    event_id VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES student(username),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

INSERT INTO volunteer (volunteer_id, student_id, event_id) VALUES 
('V001', 'C1S001', 'E001'),
('V002', 'C1S004', 'E002'),
('V004', 'C1S004', 'E001'),
('V003', 'C1S001', 'E003');

CREATE TABLE results(
  Id INT AUTO_INCREMENT PRIMARY KEY,
  event_id VARCHAR(100),
  winner VARCHAR(100),
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (winner) REFERENCES participant(participant_id)
);

INSERT INTO accomodation (venue_name,max_capacity) VALUES
('SNVH',1),
('MT',1),
('SNIG',2),
('LBS',10);

INSERT INTO food (venue_name,max_capacity) VALUES
('Tikka',1),
('Sup Dup',1),
('Mio Amore',2),
('Heritage',10);



