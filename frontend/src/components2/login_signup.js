
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import user_icon from './icons/person.png'
import lock_icon from './icons/lock.png'
import school_icon from './icons/school.png'
import name_icon from './icons/name.png'
import id_icon from './icons/id-card.png'
import './login_signup.css'

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [userId, setUserId] = useState('');
  const [IDNumber, setIDNumber] = useState('');
  const [name, setName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [deptName, setDeptName] = useState('');

  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const ID = userId;
    console.log(ID);
    const Password = password;
    console.log(Password);
    const cName=collegeName;
    const studentName=name;
    const IDno=IDNumber;
    const dept=deptName;


    // Sends a POST request to the specified URL with the user credentials
    if (action === 'Login') {
      // Sends a POST request to the specified URL with the user credentials
      axios.post(`http://127.0.0.1:3002/login_signup?userId=${ID}&password=${Password}`)
        .then(res => {
          // Assuming the server response contains userId and password
          //setUser(res.data[0]['user_type'])
          console.log(res.data);
  
          setUserId(res.data[0]['userId']);
          setPassword(res.data[0]['password']);
          // On successful login
          navigate(`/success?${res.data[0]['student_name']}&${res.data[0]['username']}&${res.data[0]['college_id']}`);
        })
        .catch(err => console.log(err)); // Logs any errors that occur during the POST request
    } else {
      // Handle the case when action is not equal to 'Login'
      console.log('This is not a login action.');
      // You can add further logic or leave it empty based on your requirements
      axios.post(`http://127.0.0.1:3002/signup?name=${studentName}&ID=${IDno}&college=${cName}&dept=${dept}&userId=${ID}&password=${Password}`)
      .then(res => {
        // Assuming the server response contains userId and password
        //setUser(res.data[0]['user_type'])
        console.log(res.data);

        setUserId(res.data[0]['userId']);
        setPassword(res.data[0]['password']);
        // On successful login
        
        navigate(`/login_signup`);
      })
      .catch(err => console.log(err)); // Logs any errors that occur during the POST request
    }
    
    
      
  }

  return (
    <div className='container'>
      <div className='login_header'>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === 'Sign Up' && ( // Conditional rendering for signup inputs
            <>
              <div className="input">
                <img src={name_icon} alt="Name" />
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
              </div>
              <div className="input">
                <img src={id_icon} alt="" />
                <input type="text" placeholder="ID(Roll) Number" onChange={e => setIDNumber(e.target.value)}/>
              </div>
              <div className="input">
                <img src={school_icon} alt="" />
                <input type="text" placeholder="College Name" onChange={e => setCollegeName(e.target.value)}/>
              </div>
              <div className="input">
                <img src={school_icon} alt="" />
                <input type="text" placeholder="Department Name" onChange={e => setDeptName(e.target.value)}/>
              </div>
            </>
          )}
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="username" onChange={e => setUserId(e.target.value)} />
          </div>
          <div className="input">
            <img src={lock_icon} alt="" />
            <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
          </div>



        </div>
        {action === 'Login' &&
          <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
        <button type="submit" className="btn" >Submit</button>
        <div className="submit-container">
          <div className={action == "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
          <div className={action == "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
        </div>

      </form>

    </div>
  )
}

export default LoginSignUp;
