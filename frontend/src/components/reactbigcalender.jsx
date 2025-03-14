import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getData,saveData} from "../api_helper.js"
import Modal from "./modal.jsx";

moment.locale("en-GB");
// CALENDER CONFIGURATION
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  // Store the calender events in the state
  const [eventsData, setEventsData] = useState([]);
  const [modalVisible,updateModalVisible]=useState(false)
  const [selectedSlot,setseletedSlot]=useState(null);
  const [eventTitle,setEventTitle]=useState("")
  
  const toggleModal=()=>updateModalVisible(state => !state)

  //_________ save the event in the local store_________________
  const saveToLocalStorage=(events)=>{
    localStorage.setItem("calenderEvents",JSON.stringify(events))
    
  }

  const getLocalStorage=async()=>{
    const StoredEvents=localStorage.getItem("calenderEvents");
    if (StoredEvents){
      setEventsData(JSON.parse(StoredEvents));
    }
    else{
      // if event data is not there get it from mongo and the alse save it in local store
      const fetchedata= await getData()
      setEventsData(fetchedata["data"])
      saveToLocalStorage(fetchedata["data"])

    }
  }
// _______________________________________________________________________

  // initializing the state with the event data on mount
  useEffect(()=>{
    // getData()
    getLocalStorage()
  },[])

  const handleSelectSlot =({start,end})=>{
    console.log("bro what")
    setseletedSlot({start,end});
    setEventTitle("");
    toggleModal();
  }

  const handleEventCreation  = () => {
    if (!selectedSlot || !eventTitle.trim()) return;
      const newEvent = {
        id: Date.now(), // Ensure a unique ID
        title: eventTitle, 
      start: selectedSlot.start, 
      end: selectedSlot.end
      };
      console.log(newEvent)
      const updateEvent=[...eventsData,newEvent]
      setEventsData(updateEvent);
      saveData(newEvent)
      saveToLocalStorage(updateEvent);
    
     
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
        onSelectSlot={handleSelectSlot}
      />
       {modalVisible && (
        <Modal canShow={modalVisible} updateModalState={toggleModal}>
          <h2>Create New Event</h2>
          <label>Enter task details</label>
          <input
            type="text"
            placeholder="Enter event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            style={{ padding: "8px", margin: "10px 0", width: "100%" }}
          />
          <button onClick={handleEventCreation}>Save Event</button>
        </Modal>
         )}
    </div>
  );
}
