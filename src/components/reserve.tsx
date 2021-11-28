import React, { useState, useEffect } from 'react';
import { 
    useParams,     
    useNavigate,        
    } from "react-router-dom";    
// component
import {  
  selectState as eventState,
  fetchAllUserEventAsync  
} from '../ducks/event/eventSlice';
import { fetchAllUserEventAPI } from '../ducks/event/eventAPI'
import {  
    updateUserAsync
  } from '../ducks/user/userSlice';
  
import { useAppSelector, useAppDispatch } from '../app/hooks';

interface eventDetailType {
  id: string,
  name: string,
  timeReq: string,
  date: string,
  time: string,
  manager: string,  
  people: number,  
}

const Reserve = () => {
    const state = useAppSelector(eventState);
    const { id } = useParams<string>();
    const [ eventDetail, setEventDetail ] = useState<eventDetailType>() 
    const [ eventArrayNumber, serEventArrayNumber ] = useState<number>(-1) // なんかあとで使うかも
    const [ eventReserved, setEventReserved ] = useState<Boolean>(false)
    const [ reservePeople, setReservePeople ] = useState<number>(0)
    const [ disableReserve, setDisableReserve ] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function serchSubEvent(id: string) {
      const subEventId = id.substring(0,36)
      const subEventDOW = id.substring(36,37)
      const subEventDate = id.substring(37,47)
      const subEventTime = id.substring(48,id.length)
      const getSubEvent = state.event.sub_event.filter(se => se.id === subEventId)[0]
      const getSubEventDay = getSubEvent.days.filter((sed, index) => {
          if(String(sed.dow) === subEventDOW && sed.start_time === subEventTime){
            serEventArrayNumber(index)
            return true
          }
          return false                  
      })
      
      if(getSubEventDay.length < 1){
          alert("エラー　管理者に問い合わせ下さい メール：xxxx@xxxx.jp")
          navigate("/")
      }
      return {
        id,
        name: getSubEvent.name,
        timeReq: `${getSubEvent.time}`,
        date: subEventDate,
        time: subEventTime,
        manager: getSubEvent.manager,  
        people: getSubEvent.people,  
      }
      
    }

    function serchSpEvent(id: string) {
      const getSpEvent = state.event.sp_event.filter(se => se.id === id)[0]      

      return {
        id,
        name: getSpEvent.name,
        timeReq: `${getSpEvent.time}`,
        date: getSpEvent.start.substring(0,10),
        time: getSpEvent.start.substring(11,getSpEvent.start.length - 1),
        manager: getSpEvent.manager,  
        people: getSpEvent.people,  
      }
    }
    
    function getDOW(date: Date) {
        var dayOfWeek = date.getDay() ;	// 曜日(数値)
        var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek]
        return dayOfWeekStr
    }

    function getEndTime(start: string, timereq: string){
        // hh:mm:ss:sss の前提
        let hours = Number(start.substring(0,2)) + Number(timereq) / 60
        let minutes = Number(start.substring(3,5)) + Number(timereq) % 60
        // 0 つける
        let hoursStr = hours / 10 < 1 ? "0" + String(hours) : hours
        let minutesStr = minutes / 10 < 1 ? "0" + String(minutes) : minutes

        return `${hoursStr}:${minutesStr}`
    }

    async function addReserve(){
      let newEventId = state.user.user.event_id.slice()
      id && newEventId.push(id)

      const input = { id: state.user.user_id, 
                      event_id: newEventId
                    }
      const rLC = await reserveLimitCheck()
      
      if(rLC){
        await dispatch(updateUserAsync(input))
        await dispatch(fetchAllUserEventAsync())
        setEventReserved(true)
      }                          
    }

    async function deleteReserve(){
      let newEventId = state.user.user.event_id.slice()
      newEventId = id ? newEventId.filter(nei => nei !== id) : newEventId
  
      const input = { id: state.user.user_id, 
                        event_id: newEventId
                      }  
      await dispatch(updateUserAsync(input))
      await dispatch(fetchAllUserEventAsync())
      setEventReserved(false)
    }

    async function reserveLimitCheck(){
      await dispatch(fetchAllUserEventAsync())
      const getReserveDate = await fetchAllUserEventAPI()
      const resPpl = getReserveDate.filter(re=>re.event_id===id)[0]
      if(resPpl && eventDetail){
        if(resPpl.event_people >= eventDetail.people){
          alert("予約がいっぱいです。") 
          return false
        }      
      }
      return true
    }

    useEffect(()=>{        
      
      if(eventDetail && reservePeople >= eventDetail.people){
        setDisableReserve(true)
      }else{
        setDisableReserve(false)
      }
    },[reservePeople])

    useEffect(()=>{      
      
      if(id){
        const resPpl = state.event.reserve_event.filter(re=>re.event_id===id)[0]
        setReservePeople(resPpl ? resPpl.event_people : 0)
      }      
    },[state.event.reserve_event])

    useEffect(()=>{
      if(id){
        const getEventDetail = id.length > 36 ? serchSubEvent(id) : serchSpEvent(id)
        setEventDetail(getEventDetail)
      }        
    },[state.event.sub_event])

    useEffect(()=>{            
      if(!id){
        alert("id　が取得できません。管理者に報告してください。")  
        navigate(`/`)
      }
      else if(state.user.user.event_id.length > 0){
        setEventReserved(state.user.user.event_id.includes(id))
      }else{
        setEventReserved(false)
      }
    },[state.user.user.event_id])

    // 人数チェック

    return (
        <div>
          {eventDetail ?
            <div>     
              <button onClick={reserveLimitCheck}>check</button>
              <p>イベント名：{eventDetail.name}</p>
              <p>担当者：{eventDetail.manager}　先生</p>              
              <p>最大人数：{eventDetail.people}人</p>
              <p>予約人数：{reservePeople}/{eventDetail.people}人</p>
              <p>日程：{eventDetail.date} ({getDOW(new Date(eventDetail.date))}曜日)</p>
              <p>時間：{eventDetail.time.substring(0,5)} ~ {getEndTime(eventDetail.time, eventDetail.timeReq)}</p>
              { eventReserved ? 
                <div>                    
                  <span>予約済み</span>
                  <button onClick={deleteReserve}>予約を取り消す</button>
                </div>
                :
                <div>    
                  <button onClick={addReserve} disabled={disableReserve as boolean}>予約する</button>
                  {disableReserve && <p>予約人数がいっぱいです</p>}
                </div>
              }
            
            </div>
            :
            <p>loading...</p>
          }        
          
        </div>
    )
}

export default Reserve