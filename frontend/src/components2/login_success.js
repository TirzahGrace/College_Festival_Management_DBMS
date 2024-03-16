import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {useState} from 'react'
import './login_success.css'
import user_icon from './icons/person.png'
import event_icon from './icons/event.png'
import accomodation_icon from './icons/accomodation.png'
import volunteer_icon from './icons/volunteer.png'

function SuccessPage() {
  // Extract parameters from the URL
  const [Name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [collegeId, setCollegeId] = useState('');

  useEffect(() => {
    // Get the URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    
    const parametersArray = Array.from(urlSearchParams);
    console.log(parametersArray);
    const nameParam = parametersArray[0][0];
    console.log(nameParam);
    const usernameParam = parametersArray[1][0];
    const collegeIdParam = parametersArray[2][0];


    
      console.log('Student Username:', usernameParam);
      console.log('College ID:', collegeIdParam);
      setName(nameParam);
      setUsername(usernameParam);
      setCollegeId(collegeIdParam);

      
   
  }, []); 

  return (
    <div className="abc">
    <div className="welcomebox">
      <h2>Welcome {Name}!!</h2>
      
      {/* Your success page content */}
    </div>
    <div className="optionbox">
      <div className="profile">
       <img src={user_icon} alt="Profile" />
       <p className="card-text">View and Update Profile!!</p>
       <a className="profilebtn" href={`/profile?${encodeURIComponent(Name)}&${encodeURIComponent(username)}&${encodeURIComponent(collegeId)}`} role="button">View Profile</a>
      </div>
      <div className="profile">
      <img src={event_icon} alt="Event" />
       <p className="card-text">Register for events!!</p>
       <a className="profilebtn" href={`/register?${encodeURIComponent(Name)}&${encodeURIComponent(username)}&${encodeURIComponent(collegeId)}`} role="button">Event registration</a>
      </div>
      {collegeId !== 'C1' ? <div className="profile">
      <img src={accomodation_icon} alt="Accomodation" />
       <p className="card-text">Register for accomodation and food!!</p>
       <a className="profilebtn" href={`/logistics?${encodeURIComponent(username)}`} role="button">Accomodation registration</a>
      </div> : <div className="profile">
      <img src={volunteer_icon} alt="Volunteer" />
       <p className="card-text">Register for volunteering!!</p>
       <a className="profilebtn" href={`/volunteer?${encodeURIComponent(Name)}&${encodeURIComponent(username)}&${encodeURIComponent(collegeId)}`} role="button">Volunteer</a>

      </div>
      }
    </div>
    </div>
    
  );
}

export default SuccessPage;
