import React, { useState } from 'react'
import axios from 'axios'
import './logistics.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogisticsSignUp = () => {
    const [username, setUsername] = useState('');
    const handleSubmit = (param1) => {
        // Your code for handling the submit event with the parameter
        console.log(`Button clicked with parameter: ${param1}`);
        axios.post(`http://127.0.0.1:3002/logistics?username=${param1}`)
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
        const usernameParam = parametersArray[0][0];
    
        console.log('Student Username:', usernameParam);    
        setUsername(usernameParam);
        
        console.log("Username: ", username);
        
    
      /*  axios.post(`http://127.0.0.1:3002/profile?username=${usernameParam}&collegeId=${collegeIdParam}`)
          .then(res => {
            // Assuming the server response contains userId and password
            //setUser(res.data[0]['user_type'])
            console.log('Request sent');
            console.log(res.data);
    
    
            //setCollegeName(res.data[0]['college_name']);
    
            // On successful login
            //navigate(`/success?${res.data[0]['student_name']}&${res.data[0]['student_id']}&${res.data[0]['college_id']}`);
    
    
    
    
          })
          .catch(err => console.log(err)); // Logs any errors that occur during the POST request*/
    
    
    
    
      }, []); // Empty dependency array to run the effect once on component mount   

    return (
        <div>
                    <button className="btn-logistics" onClick={() => handleSubmit(username)}>
                Register for accomodation
              </button>
                </div>
       
    )
}

export default LogisticsSignUp;