import React, { useState, useEffect } from 'react';

function Participants(props) {
  const [partic, setPart] = useState([]);
  console.log(props)
  useEffect(() => {
    fetch(`http://localhost:3002/getparticipants?eventId=${props.eventId}`)
      .then(response => response.json())
      .then(data => setPart(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  return (
    <div>

      {(typeof partic === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Participant's Id</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">College</th>
            </tr>
          </thead>
          <tbody>
            {partic.map(part => (
              <tr key={part.participant_id}>
                <th scope="row">{part.participant_id}</th>
                <td>{part.username}</td>
                <td>{part.student_name}</td>
                <td>{part.college_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <p key={participant.participant_id}>Participant's Id: {participant.participant_id}</p> */}

    </div>
  )
}

export default Participants;

