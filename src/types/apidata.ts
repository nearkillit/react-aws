
type subEventDays = {
    start_time: string,
    dow: number
}

export type subEventType = {
  id: string,
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  place: string,
  days: Array<subEventDays>,
  updatedAt: string
}

export type spEventType = {
  id: string,
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  place: string,
  start: string,
  updatedAt: string
}

export type delEventType = {
  id: string,
  day: string,
  sub_event_id: string,
  updatedAt: string
}

export type userType = {
  id: string,
  name: string,
  email: string,
  event_id: Array<string>,
  updatedAt: string
}