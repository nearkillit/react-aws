import React, { useState, useEffect } from 'react';
import { 
    useParams,     
    useNavigate,        
    } from "react-router-dom";    
import { useForm } from 'react-hook-form'
// component
import { selectState, 
         createSubEventAsync, 
         updateSubEventAsync,
         createSpEventAsync,
         updateSpEventAsync,
         deleteSpEventAsync,
         createDelEventAsync,
         updateDelEventAsync, } from '../ducks/event/eventSlice';
import { crudSubEventType, crudSpEventType, subEventDays } from '../ducks/event/eventAPI'
import { updateUserAsync } from '../ducks/user/userSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
// mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// mui icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

const useStyles = makeStyles(() => { 
  const theme = createTheme()
  return createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: theme.spacing(0, 'auto')
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#7d94d1',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    },
    times: {
      margin: theme.spacing(3, 'auto')
    },
    error: {
      color: 'red',
      fontSize: '12px'
    }
  })
})

interface submitEventType {  
  id?: string,
  name: string,  
  manager: string,  
  people: number,  
  time: number,
  place: string,
  days?: subEventDays[]
}

interface checkDaysType {
  [key: string]: number,
  dow: number,
  hour: number,
  minute: number
}

const initialCheckDays = {
  dow: 1,
  hour: 19,
  minute: 0,
}

const initialDefaultEvent = {
  name: "",  
  manager: "",  
  place: "",
  people: 1,  
  time: 0,  
}

const SubEventRegister = () => {
    const state = useAppSelector(selectState);
    const { id } = useParams<string>();        
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const [ eventState, setEventState ] = useState<string>("")
    const [ newRegiState, setNewRegiState ] = useState<Boolean>(false)
    const [ checkDays, setCheckDays ] = useState<checkDaysType[]>([Object.assign({},initialCheckDays)]);
    const [ checkDay, setCheckDay ] = useState<Date>();
    const [ defaultEvent, setDefaultEvent] = useState<submitEventType>(initialDefaultEvent)
    const { register, handleSubmit, formState: {errors}, setValue } = useForm({shouldUnregister: false,})
    const dayOfWeek = ["日","月","火","水","木","金","土"]
    const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const minutes = [0,10,20,30,40,50]    

    // 日付の更新 //
    const checkDayChange = (event:  Date | null) => {
      event && setCheckDay(event)
    }

    const checkDaysChange = (event: SelectChangeEvent) => {      
      const getValue = Number(event.target.value)
      const getKinds = event.target.name.substring(0,event.target.name.indexOf("_"))
      const getIndex = Number(event.target.name.substring(event.target.name.indexOf("_") + 1, event.target.name.length))
      let newCheckDays = checkDays.slice(0)
      newCheckDays[getIndex][getKinds] = getValue      
      
      setCheckDays(newCheckDays)
    };
    
    const addSubEvent = () => {
      setCheckDays([...checkDays,Object.assign({},initialCheckDays)])
    }

    const deleteSubEvent = (index: number) => {
      const newCheckDays = checkDays.filter((cD,i)　=>　i!==index)
      setCheckDays(newCheckDays)      
    }

    // イベントの削除 //
    function deleteEvent(){
      let res = window.confirm("このイベントを削除しても大丈夫ですか？")
      if(res && eventState === "sp"){
        id && dispatch(deleteSpEventAsync(id))
        alert('削除しました')
        navigate('/')
      }      
    }

    // サブミット //
    const onSubmit = async (data: submitEventType) => {      
      if(checkDays.length > 1 ){
        if(checkDuplicateDaysSameEvent()){
          alert("同じ日付のイベントがあります")
          return
        }        
      }                     

      const newDatetime = checkDays.map(cD => {
        const cDHour = cD.hour < 10 ? `0${cD.hour}` : String(cD.hour)
        const cDMinute = cD.minute < 10 ? `0${cD.minute}` : String(cD.minute)
        return { dow: cD.dow, start_time: `${cDHour}:${cDMinute}:00.000` }
      })
      
      // 重複チェックする！！！！      

      if(eventState === "sub"){

        let addData: crudSubEventType = 
                      { name: data.name, 
                        manager: data.manager, 
                        people: Number(data.people),
                        time: Number(data.time),
                        color: "#fff",
                        days: newDatetime,
                        place: data.place              
                      }      
        if(newRegiState){
          dispatch(createSubEventAsync(addData))
        }else{
          addData.id = defaultEvent.id
          dispatch(updateSubEventAsync(addData))
        }
      }else if(eventState === "sp"){          
        // 日付が今日以降かどうか
        if(!checkDay || !checkTodayAfter(checkDay as Date)){ 
          alert("今日以降の日付を入力してください") 
          return
        }         

        const addData: crudSpEventType = 
                      { name: data.name, 
                        manager: data.manager, 
                        people: Number(data.people),
                        time: Number(data.time),
                        color: "#fff",
                        place: data.place,
                        start: convertDateintoAWSDateTime(checkDay as Date)
                      }

        if(newRegiState){
          console.log(addData);          
          dispatch(createSpEventAsync(addData))
        }else{
          addData.id = defaultEvent.id
          dispatch(updateSpEventAsync(addData))
        }
      }      

      newRegiState ? alert("イベントを追加しました") : alert("イベントを更新しました")
      navigate(`/`)        
    }
    
    // 日付の変換　Date型　⇨　AWSDateTime
    function convertDateintoAWSDateTime(getDate: Date){
      const YYYY = getDate.getFullYear()
      const MM = ( getDate.getMonth() + 1 ) < 10 ? `0${getDate.getMonth() + 1}` : (getDate.getMonth() + 1)
      const DD = getDate.getDate() < 10 ? `0${getDate.getDate()}` : getDate.getDate()
      const hh = getDate.getHours() < 10 ? `0${getDate.getHours()}` : getDate.getHours()
      const mm = getDate.getMinutes() < 10 ? `0${getDate.getMinutes()}` : getDate.getMinutes()
      const ss = getDate.getSeconds() < 10 ? `0${getDate.getSeconds()}` : getDate.getSeconds()
      return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.000Z`
    }
    // 日付か今日以降かどうか
    function checkTodayAfter(getDate: Date){      
      
      const today = new Date()
      // YYYY
      if(today.getFullYear() < getDate.getFullYear()) return true
      else if(today.getFullYear() > getDate.getFullYear()) return false
      else{
        console.log("mm");
        // MM
        if(today.getMonth() < getDate.getMonth()) return true
        else if(today.getMonth() > getDate.getMonth()) return false
        else{
          console.log("dd");
          // DD
          if(today.getDate() < getDate.getDate()) return true
          else if(today.getDate() >= getDate.getDate()) return false          
        }
      }

    }
  
  // 重複チェック
    // 違うイベントでの日時の重複チェック // ⇨　別に重複しててもいい（違う会議室的な）
    // function checkDuplicateDaysDifferentEvent(){
      
    // }
    // 同一イベントで日時の重複チェック //
    function checkDuplicateDaysSameEvent() {      
      const checkCheckDays = checkDays.map(cd => `${cd.dow}${cd.hour < 10 ? "0" + String(cd.hour) : String(cd.hour)}${cd.minute < 10 ? "0" + String(cd.minute) : String(cd.minute)}`)
      return existsSameValue(checkCheckDays)
    }

    function existsSameValue(arr: string[]){
      var s = new Set(arr);
      return s.size !== arr.length;
    }    

    // paramsのidからイベントの詳細を検索（イベントの更新）//
    function serchSubEvent(id: string) {
      setEventState("sub")
      const subEventId = id.substring(0,36)
      const subEventDOW = id.substring(36,37)
      const subEventDate = id.substring(37,47)
      const subEventTime = id.substring(48,id.length)
      const getSubEvent = state.event.sub_event.filter(se => se.id === subEventId)[0]
      const getSubEventDay = getSubEvent.days.map(gSED => { 
        return { dow:gSED.dow, 
                 hour: Number(gSED.start_time.substring(0,2)), 
                 minute: Number(gSED.start_time.substring(3,5))  }})

      setDefaultEvent({   id: subEventId,
                          name: getSubEvent.name ,
                          manager: getSubEvent.manager,
                          people: getSubEvent.people,
                          time: getSubEvent.time,   
                          place: getSubEvent.place,
                          })
      setValue('name',getSubEvent.name)
      setValue('manager',getSubEvent.manager)
      setValue('people',getSubEvent.people)
      setValue('time',getSubEvent.time)
      setValue('place',getSubEvent.place)
      setCheckDays(getSubEventDay)
    }

    function serchSpEvent(id: string) {
      setEventState("sp")
      const getSpEvent = state.event.sp_event.filter(se => se.id === id)[0]

      setDefaultEvent({   id,
                          name: getSpEvent.name ,
                          manager: getSpEvent.manager,
                          people: getSpEvent.people,
                          time: getSpEvent.time,
                          place: getSpEvent.place                          
                        })
      setValue('name',getSpEvent.name)
      setValue('manager',getSpEvent.manager)
      setValue('people',getSpEvent.people)
      setValue('time',getSpEvent.time)
      setValue('place',getSpEvent.place)
      const startDate = new Date(getSpEvent.start)      
      setCheckDay(startDate)                        
    }

    // イベントの新規登録か更新かの判断、定期イベントか特殊イベントかの判断 //
    useEffect(()=>{        
          
      if(id){
        if(id.length > 37){
          serchSubEvent(id)
        }else if(id.length > 35){
          serchSpEvent(id)
        }else{
          setEventState(id)
          setNewRegiState(true)  
        }      
      }
    },[id])

    return (
      <div>        
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <Card className={classes.card}>
          { eventState === "sub" && <CardHeader className={classes.header} title="定期イベント登録" />}
          { eventState === "sp" && <CardHeader className={classes.header} title="特殊イベント登録" />}          
          <CardContent>
            <div>
              <TextField
                fullWidth
                id="name"              
                label="タイトル"
                placeholder="タイトル"
                margin="normal"
                {...register("name", {required: true, maxLength: 50})}
              />
              {errors.name && <span className={classes.error}>タイトルを入力してください</span>}
              <TextField
                fullWidth
                id="manager"              
                label="担当者"
                placeholder="担当者"
                margin="normal"                
                {...register("manager", {required: true, maxLength: 20})}
              />
              {errors.manager && <span className={classes.error}>担当者を入力してください</span>}
              <TextField
                fullWidth
                id="people"              
                type="number"
                label="最大人数"
                placeholder="最大人数"
                margin="normal"                
                {...register("people", {required: true, min: 1, max:1000 })}
              />
              {errors.manager && <span className={classes.error}>担当者を入力してください</span>}
              <TextField
                fullWidth
                id="time"              
                type="number"
                label="所要時間（分）"
                placeholder="所要時間（分）"
                margin="normal"                
                {...register("time", {required: true, min: 1, max: 1000 })}
              />
              <TextField
                fullWidth
                id="place"                              
                label="場所"
                placeholder="場所"
                margin="normal"                
                {...register("place", {required: true, maxLength: 100})}
              />
              {errors.time && <span className={classes.error}>所要時間を正しく入力してください(1 ~ 1000)</span>}
              <Box sx={{ minWidth: 120 }}>
                { eventState === "sub" && 
                checkDays.map((cd,index)=>(
                <div className={classes.times} key={`checkDays${index}`}>
                  <FormControl sx={{ width: '25%' }}>
                    <InputLabel id="dow">曜日</InputLabel>
                    <Select
                      labelId="dow"
                      id="dowmenu"
                      label="dow"
                      value={String(cd.dow)}
                      name={`dow_${String(index)}`}
                      onChange={checkDaysChange}
                    >
                      { dayOfWeek.map((dows,i) => (
                        <MenuItem value={i} key={`dow${i}`}>{dows}</MenuItem>
                      ))}                    
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: '25%' }}>
                    <InputLabel id="hour">時間</InputLabel>
                    <Select
                      labelId="hour"
                      id="hourmenu"                    
                      label="hour"
                      value={String(cd.hour)}
                      name={`hour_${String(index)}`}
                      onChange={checkDaysChange}
                    >
                    { hours.map((hors,i) => (
                      <MenuItem value={hors} key={`hour${i}`}>{hors}</MenuItem>
                    ))}                    
                  </Select>
                </FormControl>
                <FormControl sx={{ width: '25%' }}>
                  <InputLabel id="minute">分</InputLabel>
                  <Select
                    labelId="minute"
                    id="minutemenu"                    
                    label="minute"
                    value={String(cd.minute)}
                    name={`minute_${String(index)}`}
                    onChange={checkDaysChange}
                  >
                    { minutes.map((mins,i) => (
                      <MenuItem value={mins} key={`minute${i}`}>{mins}</MenuItem>
                    ))}                    
                  </Select>
                </FormControl>
                <IconButton onClick={()=>deleteSubEvent(index)}><ClearIcon /></IconButton>                
                </div>
                ))}
                {checkDays.length < 12 && eventState === "sub" &&
                <IconButton onClick={addSubEvent}><AddIcon />追加</IconButton>
                }
                { eventState === "sp" && 
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Date Time picker"
                      value={checkDay}
                      onChange={checkDayChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                }
              </Box>
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"              
              className={classes.loginBtn}
              type="submit"
            >
            { newRegiState ? "イベント登録" : "イベント更新"}
            </Button>            
          </CardActions>          
        </Card>
      </form>
      { !newRegiState && eventState === "sp" && 
              <Button
                variant="contained"
                size="large"              
                className={classes.loginBtn}
                type="submit"
                color="error"
                onClick={deleteEvent}
              >
              イベントの削除
              </Button>}
    </div>
    )
}

export default SubEventRegister