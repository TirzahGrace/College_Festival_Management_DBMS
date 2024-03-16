import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react'
import './profile_details.css'
import axios from 'axios';





function ProfilePage() {
  // Extract parameters from the URL
  const [Name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [studentId,setStudentId]=useState('');
  const [collegeId, setCollegeId] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [deptName, setdeptName] = useState('');


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


    
    console.log('Username:', usernameParam);
    console.log('College ID:', collegeIdParam);
    setName(nameParam);
    setUsername(usernameParam);
    setCollegeId(collegeIdParam);

    console.log("Username: ", username);
    
    axios.post(`http://127.0.0.1:3002/profile?username=${usernameParam}&collegeId=${collegeIdParam}`)
    .then(res => {
      // Assuming the server response contains userId and password
      //setUser(res.data[0]['user_type'])
      console.log('Request sent');
      console.log(res.data);
      
      
      //setCollegeName(res.data[0]['college_name']);
      setdeptName(res.data[0]['department']);
      setStudentId(res.data[0]['student_id']);
      // On successful login
      //navigate(`/success?${res.data[0]['student_name']}&${res.data[0]['student_id']}&${res.data[0]['college_id']}`);

      

    
    })
        .catch(err => console.log(err)); // Logs any errors that occur during the POST request


   

  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div className='profilediv'>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={Name} />

        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Your Student ID</label>
          <input type="text" className="form-control" id="exampleInputPassword1" value={studentId} />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword2">Your Department</label>
          <input type="text" className="form-control"  value={deptName} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>

  );
}

export default ProfilePage;