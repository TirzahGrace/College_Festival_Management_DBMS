import React, { useState, useEffect } from 'react';

function Volunteers(props) {
  const [volun, setVolun] = useState([]);
  console.log(props)
  useEffect(() => {
    fetch(`http://localhost:3002/getvolunteers?eventId=${props.eventId}`)
      .then(response => response.json())
      .then(data => setVolun(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  return (
    <div>

      {(typeof volun === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Volunteer Id</th>
              <th scope="col">Student Id</th>
              <th scope="col">Student Name</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {volun.map(v => (
              <tr key={v.volunteer_id}>
                <th scope="row">{v.volunteer_id}</th>
                <td>{v.student_id}</td>
                <td>{v.student_name}</td>
                <td>{v.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <p key={participant.participant_id}>Participant's Id: {participant.participant_id}</p> */}

    </div>
  )
}

export default Volunteers;


