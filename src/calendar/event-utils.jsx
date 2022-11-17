// YYYY-MM-DD of today
//import '../api/api';
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, '');
// const api = new api();
//
// let testTask = api.getTask(1);
// let testTitle = testTask.name;
// let testDescription = testTask.description;
// let testDate = testTask.date;

export const INITIAL_EVENTS = [
  {
    // id: createEventId(),
    // title: 'All-day event',
    // start: todayStr,
  },
  {
    // id: createEventId(),
    // title: 'Timed event',
    // start: todayStr + 'T12:00:00'
  },
];

export function createEventId() {
  return String(eventGuid++);
}
