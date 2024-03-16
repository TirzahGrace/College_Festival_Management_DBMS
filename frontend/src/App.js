import React, { useState, useEffect, createContext, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components1/Navbar';
import Events from './components1/events';
import Login from './components1/login';
import AdminPage from './components1/adminpage';
import Organizer from './components1/organizer';
import {AppContext} from './AppContext';
import LoginSignUp from './components2/login_signup';
import SuccessPage from './components2/login_success';
import ProfilePage from './components2/profile_details';
import EventReg from './components2/event_registration';
import VolunteerReg from './components2/volunteer';
import LogisticsSignUp from './components2/logistics';



function App() {
  const [userId, setUserId] = useState('default');
  const [loginView, setLoginView] = useState(0);

  useEffect(() => {
    // Your logic here if you need to do anything on component mount
  }, []);
  function base_page(){
    if(loginView===0){
      return(<Login/>)
    }
    else if(loginView===1){
      return(<AdminPage adminUserId={userId}/>)
    }
    else if(loginView===2){
      return(<Organizer orgUserId={userId}/>)
    }
  }
  return (
    <AppContext.Provider value={{userId,setUserId,loginView,setLoginView}}>
      <Router>
        <Navbar />
        <h2>{userId} and {loginView}</h2>
        <Routes>
          <Route path="/" element={<Events/>} />
          <Route path="/login" element={base_page()} />
          <Route path="/login_signup" element={<LoginSignUp />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<EventReg />} />
        <Route path="/volunteer" element={<VolunteerReg />} />
        <Route path="/logistics" element={<LogisticsSignUp />} />
        </Routes>
      </Router>
    </AppContext.Provider>

  );
}

export default App;



