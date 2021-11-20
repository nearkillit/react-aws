import React, { useState, useEffect } from 'react';
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
// component
import {  
  selectState as eventState,  
} from '../ducks/event/eventSlice';
// calender
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from '@fullcalendar/timegrid';  
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface calenderEventsType {
  id: string,
  title: string,
  date: string
}

const Calender = () => {
    const state = useAppSelector(eventState)
    const [events, setEvents] = useState<calenderEventsType[]>([])
    const [subEvent, setSubEvent] = useState(state.event.sub_event)

    const handleDateClick = useCallback((arg: DateClickArg) => {
        console.log(arg);        
      }, []);
    
      const handleEventClick = useCallback((arg: EventClickArg) => {
        console.log(arg);        
      }, []); 
    
    const thisCalenderDay = (getDate: Date, getStart: string) => {
      const thisMonth = (getDate.getMonth() + 1) < 10 ? "0" + String(getDate.getMonth() + 1) : String(getDate.getMonth() + 1)
      const thisDate = getDate.getDate() < 10 ? "0" + String(getDate.getDate()) : String(getDate.getDate())
      return `${getDate.getFullYear()}-${thisMonth}-${thisDate}T${getStart}`
    }    

    useEffect(()=>{
      setSubEvent(state.event.sub_event)
    },[state])

    useEffect(() => {
      const newSubEvent: Array<calenderEventsType> = []      

      const addSubEvent = subEvent.map(e => {                
        const addSubEventDays = e.days.map(d => {
          const date = new Date ()      
          const dayOfWeek = date.getDay()          
          let dowDiff = dayOfWeek - d.dow
          dowDiff = dowDiff < 0 ? dowDiff + 7 : dowDiff
          date.setDate(date.getDate() + dowDiff)

          for(let i=0; i<8; i++){       
            const nSEID = e.id + d.dow + thisCalenderDay(date, d.start_time)
            newSubEvent.push({ id: nSEID, title: e.name, date: thisCalenderDay(date, d.start_time) })
            date.setDate(date.getDate() + 7)
          }          
          return 
        })
        return 
      })
      
      console.log(newSubEvent);
      const joinSubEvent = events.concat(newSubEvent)
      setEvents(joinSubEvent)
    },[subEvent])

    return (        
        <div>
            <FullCalendar 
          locale="ja"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={events}      
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}    
        />        
        </div>        
    )
}

export default Calender