import React, { useState, useEffect, useRef } from 'react';
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
// component
import {  
  selectState as eventState,
  selectSubEvent,
  selectSpEvent,
  selectDelEvent 
} from '../ducks/event/eventSlice';
// calender
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from '@fullcalendar/timegrid';  
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
// types
import { subEventType, spEventType, delEventType } from "../types/apidata"

interface calenderEventsType {
  id: string,
  title: string,
  date: string
}

const Calender = () => {
    const state = useAppSelector(eventState)
    const stateSubEvent = useAppSelector(selectSubEvent)
    const stateSpEvent = useAppSelector(selectSpEvent)
    const stateDelEvent = useAppSelector(selectDelEvent)
    const [events, setEvents] = useState<calenderEventsType[]>([])        
    const navigate = useNavigate();
    const isFirstRender = useRef(false)    

    const handleDateClick = useCallback((arg: DateClickArg) => {        
        // navigate(`/subeventregi/${arg.dateStr}`)
      }, []);
    
      const handleEventClick = useCallback((arg: EventClickArg) => {

        if(state.user.user_group.includes("admin")){
          navigate(`/subeventregi/${arg.event._def.publicId}`)
        }else{
          navigate(`/reserve/${arg.event._def.publicId}`)        
        }        
      }, []); 
    
    const thisCalenderDay = (getDate: Date, getStart: string) => {
      const thisMonth = (getDate.getMonth() + 1) < 10 ? "0" + String(getDate.getMonth() + 1) : String(getDate.getMonth() + 1)
      const thisDate = getDate.getDate() < 10 ? "0" + String(getDate.getDate()) : String(getDate.getDate())
      return `${getDate.getFullYear()}-${thisMonth}-${thisDate}T${getStart}`
    }    

    useEffect(() => {                  
      isFirstRender.current = true      
    }, [])

    useEffect(() => {

      if(state.event.del_event_status === "completed" && 
         state.event.sub_event_status === "completed" && 
         state.event.sp_event_status === "completed" && 
         isFirstRender.current ){
                    
        isFirstRender.current = false
        const newSubEvent: Array<calenderEventsType> = []                    
        
        const addSubEvent = stateSubEvent.map(e => {                
          const addSubEventDays = e.days.map(d => {
            const date = new Date ()      
            const dayOfWeek = date.getDay()          
            let dowDiff = d.dow - dayOfWeek 
            dowDiff = dowDiff < 0 ? dowDiff + 7 : dowDiff
            date.setDate(date.getDate() + dowDiff)                        
            
            for(let i=0; i<8; i++){
              // del event check              
              const mm = ( date.getMonth() + 1 ) < 10 ? "0" + String( date.getMonth() + 1 ) : String( date.getMonth() + 1 )
              const dd = ( date.getDate() ) < 10 ? "0" + String( date.getDate() ) : String( date.getDate() )
              const yyyymmdd = `${date.getFullYear()}-${mm}-${dd}`
              const yyyymmddhhmmss = `${yyyymmdd}T${d.start_time}Z`

              if(stateDelEvent.filter(de => de.sub_event_id === e.id && de.day === yyyymmddhhmmss).length < 1){
                const nSEID = e.id + d.dow + thisCalenderDay(date, d.start_time)
                // 予約人数                                
                const resPpl = state.event.reserve_event.filter(re=>re.event_id===nSEID)[0]
                const titleAddReserve = `${e.name} ${resPpl ? resPpl.event_people : 0}/${e.people}`
                newSubEvent.push({ id: nSEID, title: titleAddReserve, date: thisCalenderDay(date, d.start_time) })  
              }              
              date.setDate(date.getDate() + 7)
            }          
            return 
          })
          return 
        })

        const addSpEvent = stateSpEvent.map(se => {
          // 予約人数                                
          const resPpl = state.event.reserve_event.filter(re=>re.event_id===se.id)[0]
          const titleAddReserve = `${se.name} ${resPpl ? resPpl.event_people : 0}/${se.people}`
          let seObj = { id: se.id, title: titleAddReserve, date: se.start.substring(0,se.start.length-1)}          
          return seObj
        })              
        
        const joinSubSpEvent = addSpEvent.concat(newSubEvent)        
        setEvents(joinSubSpEvent)
      } 
    },[state.event])

    return (        
        <div>
          <button onClick={()=>console.log(events)}>events</button>
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