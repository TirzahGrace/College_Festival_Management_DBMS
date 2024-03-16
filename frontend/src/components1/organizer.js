import React, { useState, useEffect } from 'react';
import ViewEventPart from './OrganizerPage/ViewEventPart';
import ViewLogistics from './OrganizerPage/ViewLogistics';
import OrgProfile from './OrganizerPage/OrgProfile';

function Organizer(props) {
    const [view, setView] = useState(0);
    function handleButtonClick(val) {
        console.log(val)
        setView(val)
        console.log("view =", view)
    }
    function viewComponent() {
        if (view === 0) {
            return <OrgProfile orgUserId={props.orgUserId}/>
        }
        else if (view === 1) {
            return <ViewEventPart />
        }
        else if (view === 2) {
            return <ViewLogistics/>
        }
    }

    return (
        <div class='container'>
            <h1> Hello Organizer</h1>
            <br></br>
            <td><button className="btn btn-success mx-3" onClick={() => handleButtonClick(0)}>View Profile</button></td>
            <td><button className="btn btn-success mx-3" onClick={() => handleButtonClick(1)}>View Events Details</button></td>
            <td><button className="btn btn-success mx-3" onClick={() => handleButtonClick(2)}>View Logistics Details</button></td>
            <br></br>
            {viewComponent()}
        </div>
    )
}

export default Organizer;