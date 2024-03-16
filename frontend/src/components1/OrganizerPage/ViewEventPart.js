import React, { useState, useEffect } from 'react';

import Participants from './Participants';
import Volunteers from './Volunteer';
import EventStatus from './EventStatus';

function ViewEventPart() {
  // const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [singleEvent, setSingleEvent] = useState({});
  const [sec_view, setSec_View] = useState(0);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);


  function handleButtonClick(val, event) {
    setSec_View(val)
    console.log("view =", sec_view)
    setSingleEvent(event)
    console.log(singleEvent)
  }
  function handleButtonClick1() {
    console.log("Reschedule")
  }
  
  function ColoredLine() {
    const lineStyle = {
      border: 'none',
      height: '2px',
      backgroundColor: 'blue'
    };
    return (
      <hr style={lineStyle} />
    );
  }
  function viewSecComponent() {
    if (sec_view === 0) {
      console.log(singleEvent)
      return (singleEvent.event_description)
    }
    else if (sec_view === 1) {
      // console.log(singleEvent.event_id)
      return(
        <Participants eventId={singleEvent.event_id}/>
      )
    }
    else if (sec_view === 2) {
      return(<Volunteers eventId={singleEvent.event_id}/>)
    }
    else if(sec_view===3){
      return(<EventStatus eventId={singleEvent.event_id}/>)
    }
    else if(sec_view===4){

    }
    else if(sec_view===5){
      return(
        <div>
          <p><strong>Date:{new Date(singleEvent.event_date).toLocaleDateString()}</strong></p>
          <button className="btn btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick1()}>Reschedule</button>
        </div>
      )
    }
  }
  return (
    <div className='container'>
      <h2>Event Details</h2>
      {(typeof events === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <div class="accordion" id="accordionExample">{
          events.map(event => (
            
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${event.event_id}`} aria-expanded="true" aria-controls="collapseOne">
                  {event.event_id} : {event.event_name}
                </button>
              </h2>
              <div id={`collapse${event.event_id}`} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="container text-center">
                    <div class="row">
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(0,event)}>Description</button>
                      </div>
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(1,event)}>Participants</button>
                      </div>
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(2,event)}>Volunteers</button>
                      </div>
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(3,event)}>Status</button>
                      </div>
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(4,event)}>Winner</button>
                      </div>
                      <div class="col">
                        <button className="btn list-group-item btn-secondary mx-1 btn-sm" onClick={() => handleButtonClick(5,event)}>Schedule</button>
                      </div>
                    </div>
                  </div>
                  {ColoredLine()}
                  <div className='container'>
                    
                    {event.event_id===singleEvent.event_id && viewSecComponent()}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewEventPart;

{/* <p><strong>Date:{new Date(event.event_date).toLocaleDateString()}</strong></p>
<p>{event.event_description}</p> */}
