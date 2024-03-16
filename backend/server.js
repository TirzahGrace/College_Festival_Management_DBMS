// server.js
import cors from 'cors'
import express from 'express'
import { getEvents, getLoginData, getOrganizers,addOrganizer, removeOrganizer,getParticipants, getVolunteers,getEventStatus,getStudentLogin,getProfileDetails,RegisterEvent,VolunteerEvent,StudentSignUp,insertIntoLogisticsAndStudents} from './database.js'

const app = express();
const PORT = 3002 ;

app.use(cors());

app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await getEvents();
    // console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/organizers', async (req, res) => {
  try {
    const [rows] = await getOrganizers();
    // console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error('Error fetching organizers:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  console.log(req)
  const userId= req.query['userId'];
  const passkey= req.query['password'];
  console.log(userId,passkey)
  try {
    const [rows] = await getLoginData(userId,passkey);
    // console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error('Error fetching login_password', error);
    res.status(500).send('Internal Server Error');
  }
  });

app.get('/addorganizer', async (req, res) => {
    const userId  = req.query.userId;
    console.log(userId)
    try {
      const [rows] = await addOrganizer(userId);
      // console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error inserting organizer in login_credentials', error);
      res.status(500).send('Internal Server Error');
    }
});

app.post('/removeorganizer',async(req,res)=>{
  console.log(req)
  const userId  = req.query.userId;
    console.log(userId)
    try {
      await removeOrganizer(userId);
      // console.log(rows)
      res.json('delted');
    } catch (error) {
      console.error('Error deleting organizer from It\'s table', error);
      res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.MYSQL_HOST}:${PORT}`);
});

app.get('/getparticipants',async(req,res)=>{
  console.log(req)
  const eventId  = req.query.eventId;
    console.log(eventId)
    try {
      const [rows] = await getParticipants(eventId);
      // console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error deleting organizer from It\'s table', error);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/getvolunteers',async(req,res)=>{
  console.log(req)
  const eventId  = req.query.eventId;
    console.log(eventId)
    try {
      const [rows] = await getVolunteers(eventId);
      // console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error deleting organizer from It\'s table', error);
      res.status(500).send('Internal Server Error');
    }
});

app.get('/geteventstatus',async(req,res)=>{
  console.log(req)
  const eventId  = req.query.eventId;
    console.log(eventId)
    try {
      const [rows] = await getEventStatus(eventId);
      // console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error deleting organizer from It\'s table', error);
      res.status(500).send('Internal Server Error');
    }
});

app.post('/login_signup', async (req, res) => {
  
  console.log(req)
  const userId= req.query['userId'];
  const passkey= req.query['password'];
  
  console.log(userId,passkey)
  try {
    const [rows] = await getStudentLogin(userId,passkey);
    console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error('Error fetching login_password', error);
    res.status(500).send('Internal Server Error');
  }
  });

  app.post('/signup', async (req, res) => {
  
    console.log(req)
    const userId= req.query['userId'];
    const passkey= req.query['password'];
    const name=req.query['name'];
    const dept=req.query['dept'];
    const college=req.query['college'];
    const ID=req.query['ID'];
    
    console.log(userId,passkey,name,dept,college,ID);
    try {
      const [rows] = await StudentSignUp(userId,passkey,name,dept,college,ID);
      console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error fetching login_password', error);
      res.status(500).send('Internal Server Error');
    }
    });

    app.post('/logistics', async (req, res) => {
  
      console.log(req)
      const userId= req.query['username'];
      /*const passkey= req.query['password'];*/
     
      
      console.log("Username : ",userId);
      try {
        const [rows] = await insertIntoLogisticsAndStudents(userId);
        console.log(rows)
        res.json(rows);
      } catch (error) {
        console.error('Error fetching login_password', error);
        res.status(500).send('Internal Server Error');
      }
      });

  app.post('/profile', async (req, res) => {
  
    console.log(req)
    const username= req.query['username'];
    const collegeId= req.query['collegeId'];
    
    console.log('Printing.....');
    console.log(username,collegeId);
    try {
      const [rows] = await getProfileDetails(username,collegeId);
      console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error('Error fetching login_password', error);
      res.status(500).send('Internal Server Error');
    }
    });

    app.post('/register', async (req, res) => {
  
      console.log(req)
      const username= req.query['username'];
      const collegeId= req.query['collegeId'];
      const eventId= req.query['eventId'];
      
      console.log('Printing.....');
      console.log(username,collegeId,eventId);
      try {
        const [rows] = await RegisterEvent(username,collegeId,eventId);
        console.log(rows)
        res.json(rows);
      } catch (error) {
        console.error('Error fetching login_password', error);
        res.status(500).send('Internal Server Error');
      }
      });

      app.post('/volunteer', async (req, res) => {
  
        console.log(req)
        const username= req.query['username'];
        const collegeId= req.query['collegeId'];
        const eventId= req.query['eventId'];
        
        console.log('Printing.....');
        console.log(username,collegeId,eventId);
        try {
          const [rows] = await VolunteerEvent(username,eventId);
          console.log(rows)
          res.json(rows);
        } catch (error) {
          console.error('Error fetching login_password', error);
          res.status(500).send('Internal Server Error');
        }
        });

