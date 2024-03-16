


import React, { useState, useEffect } from 'react';
import './events.css';
import axios from 'axios';

const EventReg = () => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');
  const [collegeId, setCollegeId] = useState('');

  const handleSubmit = (param1, param2, param3) => {
    // Your code for handling the submit event with the parameter
    console.log(`Button clicked with parameter: ${param1}, ${param2},${param3}`);
    axios.post(`http://127.0.0.1:3002/register?username=${param1}&collegeId=${param2}&eventId=${param3}`)
      .then(res => {
        // Assuming the server response contains userId and password
        //setUser(res.data[0]['user_type'])
        console.log('Request sent');
        console.log(res.data);



        //setCollegeName(res.data[0]['college_name']);

        // On successful login
        //navigate(`/success?${res.data[0]['student_name']}&${res.data[0]['student_id']}&${res.data[0]['college_id']}`);




      })
      .catch(err => console.log(err)); // Logs any errors that occur during the POST request
    // Add your logic here
  };


  useEffect(() => {
    // Get the URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Extract parameters and store them in an array
    const parametersArray = Array.from(urlSearchParams);
    console.log(parametersArray);
    const nameParam = parametersArray[0][0];
    console.log(nameParam);
    const usernameParam = parametersArray[1][0];
    const collegeIdParam = parametersArray[2][0];



    console.log('Student Username:', usernameParam);
    console.log('College ID:', collegeIdParam);

    setUsername(usernameParam);
    setCollegeId(collegeIdParam);

    console.log("Username: ", username);
    console.log("College : ",collegeId);

    axios.post(`http://127.0.0.1:3002/profile?username=${usernameParam}&collegeId=${collegeIdParam}`)
      .then(res => {
        // Assuming the server response contains userId and password
        //setUser(res.data[0]['user_type'])
        console.log('Request sent');
        console.log(res.data);


        //setCollegeName(res.data[0]['college_name']);

        // On successful login
        //navigate(`/success?${res.data[0]['student_name']}&${res.data[0]['student_id']}&${res.data[0]['college_id']}`);




      })
      .catch(err => console.log(err)); // Logs any errors that occur during the POST request




  }, []); // Empty dependency array to run the effect once on component mount

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const formatDate = (dateString) => {
    return dateString.substring(0, 10); // Extract the first 10 characters (date part)
  };

  return (
    <div>
      <h2>Event List</h2>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Description</th>
            <th>Event Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.event_id}>
              <td>{event.event_name}</td>
              <td>{event.event_description}</td>
              <td>{formatDate(event.event_date)}</td>
              <td><button className="btn-2" onClick={() => handleSubmit(username, collegeId, event.event_id)}>
                Register
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventReg;