import React, { useState, useEffect } from 'react';
import axios from 'axios'


function AdminPage(props){
    const [organizers, setOrganizers] = useState([]);
    // const [orgToRemove, setOrgToRemove] = useState('');
    const [userId, setUserId] = useState('');
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    useEffect(() => {
    fetch('/api/organizers')
      .then(response => response.json())
      .then(data => {setOrganizers(data)
    console.log(data)})
      .catch((error) => console.error('Error fetching events:', error));
    }, []);

    // if (orgToRemove !== ''){
    //     console.log(orgToRemove)
    //     // setOrgToRemove('')
    // }

    function addOrganizer(event){
      event.preventDefault();
      console.log(userId);
      axios.get(`http://localhost:3002/addorganizer?userId=${userId}`)
      .then(res => {
        console.log("Successfully added...")
        console.log(res.data)
        }).catch(err => console.log(err));
        }
    function handleButtonClick(userId) {
      console.log("Button clicked for user ID:", userId);
      axios.post(`http://localhost:3002/removeorganizer?userId=${userId}`)
        .then(res => {
        console.log("Successfully deleted...")
        console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    
  
    console.log(props.adminUserId)
    return(
        <div>
            <h1>Hello Admin {props.adminUserId}</h1>
            <br></br>
            <br></br>
            
                  
      {(typeof organizers === 'undefined')? (
        <p>Loading...</p>
      ):(
        <table class="table container">
        <thead>
          <tr>
            <th scope="col">Organizer Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map(organizer => (
          <tr key={organizer.userID}>
            <th scope="row">{organizer.userID}</th>
            <td>{organizer.name}</td>
            <td>{organizer.email}</td>
            <td><button className="btn btn-success mx-3" onClick={() => handleButtonClick(organizer.userID)}>Remove</button></td>
           
          </tr>
          ))}
        </tbody>
        </table>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <form class="container" onSubmit={addOrganizer}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Enter the userId of the new member</label>
                <input type="text" class="form-control" id="exampleInputEmail1" 
                onChange={e=> setUserId(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary">Add Organizer</button>
        </form>
        </div>
        
    )
}

export default AdminPage;