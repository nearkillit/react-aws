
type subEventDays = {
    start_time: string,
    dow: number
}

export type subEventType = {
  name: string,
  time: number,
  manager: string,
  color: string,
  people: number,
  days: Array<subEventDays>
}