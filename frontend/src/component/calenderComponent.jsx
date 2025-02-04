import React,{useState} from "react";
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css";
import '@style/calenderComponent.css'


function CalendarComponent(){
    const[date,setDate]=useState(new Date());
    
    return (
        <div className="calendar-container">
            <h2>pick date</h2>
            <Calendar onChange={setDate} value={date}/>
            <p>selected date:{date.toDateString()}</p>
        </div>
    );
}

export default CalendarComponent;