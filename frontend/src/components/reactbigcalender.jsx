import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getData,saveData} from "../api_helper.js"
import { Modal } from "./model.jsx";

moment.locale("en-GB");
// CALENDER CONFIGURATION
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  // Store the calender events in the state
  const [eventsData, setEventsData] = useState([]);
  const [modalopen,setModalOpen]=useState(false)
  const [selectedSlot, setSelectedSlot]=useState(null);


  // save the event in the local store
  const saveToLocalStorage=(events)=>{
    localStorage.setItem("calenderEvents",JSON.stringify(events))
    
  }

  const getLocalStorage=async()=>{
    const StoredEvents=localStorage.getItem("calenderEvents");
    if (StoredEvents){
      setEventsData(JSON.parse(StoredEvents));
      console.log(StoredEvents)
    }
    else{
      // if event data is not there get it from mongo and the alse save it in local store
      const fetchedata= await getData()
      setEventsData(fetchedata["data"])
      saveToLocalStorage(fetchedata["data"])

    }
  }

  // initializing the state with the event data on mount
  useEffect(()=>{
    // getData()
    getLocalStorage()
  },[])

  const handleSelect = ({ start, end }) => {

    setSelectedSlot({start,end})
    setModalOpen(true)
     
  };

  const handleSave=(title)=>{
    if (title){
      const newEvent = {
        id: Date.now(), // Ensure a unique ID
        title,
        start: selectedSlot.start,  
        end: selectedSlot.end,      
      };
      const updateEvent=[...eventsData,newEvent]
      setEventsData(updateEvent);
      saveData(newEvent)
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
      <Modal isOpen={modalopen} 
      onclose ={()=>setModalOpen(false)}
      onsave ={handleSave}
      />

    </div>

  );
}
