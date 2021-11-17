import { useCallback } from "react";
// calender
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from '@fullcalendar/timegrid';  
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

const Calender = () => {
    const handleDateClick = useCallback((arg: DateClickArg) => {
        console.log(arg);        
      }, []);
    
      const handleEventClick = useCallback((arg: EventClickArg) => {
        console.log(arg);        
      }, []);
    
      const thisMonth = () => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      };

    return (
        <div>
            <FullCalendar 
          locale="ja"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={[            
            { title: "ボクシング　初心者", date: `${thisMonth()}-08T12:00:00` },
            { title: "ボクシング　中級者", date: `${thisMonth()}-08T14:00:00` },
            { title: "ダンスレッスン　初心者", date: `${thisMonth()}-09T15:00:00` },
            { title: "ダンスレッスン　中級者", date: `${thisMonth()}-09T17:00:00` },
            { title: "休み", date: `${thisMonth()}-10` },
            { title: "柔術　初心者", date: `${thisMonth()}-11T12:00:00` },
            { title: "柔術　中級者", date: `${thisMonth()}-11T14:00:00` },
            { title: "ヨガ　初心者", date: `${thisMonth()}-12T15:00:00` },
            { title: "ヨガ　中級者", date: `${thisMonth()}-12T17:00:00` },
          ]}      
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}    
        />        
        </div>
    )
}

export default Calender