import React, { useState, useEffect } from 'react';
// import './events.css';

function Events(){

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  // console.log(events[0])

  return (
    <div>
      
      {(typeof events === 'undefined')? (
        <p>Loading...</p>
      ):(
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
          <tr key={event.event_id}>
            <td>{event.event_name}</td>
            <td>{event.event_description}</td>
            <td>Date: {new Date(event.event_date).toLocaleDateString()}</td>
          </tr>
          ))}
        </tbody>
        </table>
      )}
      <h2>Wanna participate!</h2>
      <a href="/login_signup" class="btn btn-primary">Register for the Event</a>
    </div>
  );
};

export default Events;