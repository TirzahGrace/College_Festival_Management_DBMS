import React, { useState, useEffect,useContext }  from 'react';
import axios from 'axios'
// import { Navigate } from 'react-router-dom';
import AdminPage from './adminpage';
import Organizer from './organizer';
import {AppContext} from '../AppContext';


function Login(){
    const [password, setPassword]=useState('')
    const [userType,setUser]=useState('')
    const data=useContext(AppContext)
    // const { userId, setUserId, loginView, setLoginView } = data;
    const [redirectToOrg, setRedirectToOrg] = useState(false);
   
    // console.log("login view", data.loginView )
    function handleSubmit(event){
        event.preventDefault();
        console.log(data.userId, password);
        axios.post(`http://localhost:3002/login?userId=${data.userId}&password=${password}`)
        .then(res => {setUser(res.data[0]['user_type'])
            data.setUserId(res.data[0]['userId'])
            if (userType === 'admin'){
                console.log(data.userId)
                console.log("admin")
                data.setLoginView(1);
            }
            else if(userType === 'organizer'){
                console.log("organizer")
                data.setLoginView(2);
                // setRedirectToOrg(true);
            }
        })
        .catch(err => console.log(err));
    }
    // if (redirectToAdmin) {return <AdminPage  userId={userId}/>}
    // if(redirectToOrg) {return <Organizer  userId={userId}/>}
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">UserID</label>
                <input type="text" class="form-control" id="exampleInputEmail1" 
                onChange={e=> data.setUserId(e.target.value)} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"
                onChange={e=> setPassword(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        </div>
    )
}

export default Login;