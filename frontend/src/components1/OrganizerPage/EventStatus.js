import React, { useState, useEffect } from 'react';

function EventStatus(props) {
  const [status, setStatus] = useState([]);
  console.log(props)
  useEffect(() => {
    fetch(`http://localhost:3002/geteventstatus?eventId=${props.eventId}`)
      .then(response => response.json())
      .then(data => setStatus(data[0]))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  function handleButtonClick(){
    console.log("change status")
  }
  return (
    <div>
        <h3>  {status.event_status}</h3>
        <button className="btn btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick()}>Change Status</button>
    </div>
  )
}

export default EventStatus;

