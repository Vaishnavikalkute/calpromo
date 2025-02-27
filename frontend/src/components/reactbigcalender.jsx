import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
// CALENDER CONFIGURATION
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  // Store the calender events in the state
  const [eventsData, setEventsData] = useState([]);

  // save the event in the local store
  const saveToLocalStorage=(events)=>{
    localStorage.setItem("calenderEvents",JSON.stringify(events))
  }

  const getLocalStorage=()=>{
    const StoredEvents=localStorage.getItem("calenderEvents");
    if (StoredEvents){
      setEventsData(JSON.parse(StoredEvents));
    }
  }

  // initializing the state with the event data on mount
  useEffect(()=>{
    getLocalStorage()
  },[])

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title){
      const newEvent = {
        id: Date.now(), // Ensure a unique ID
        title,
        start,
        end
      };
      const updateEvent=[...eventsData,newEvent]
      setEventsData(updateEvent);
      saveToLocalStorage(updateEvent);
    }
     
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
