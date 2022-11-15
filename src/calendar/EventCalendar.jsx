// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Api from '../api/api';
/* let testTitle = testTask.name;

  let testDescription = testTask.description;

  let testDate = testTask.date;

  function handleEventClick = clickInfo() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  function handleEvents = events => {
    this.setState({
      currentEvents: events,
    });
  };
//This will render the event information for the calendar
*/

function TaskInfo({ taskInfo }) {
  const api = new Api();
  //const displayDate = new Date(date);

  const [{ name, description, date, repeat }, setTask] = useState({
    name: '',
    description: '',
    date: moment(date).format('YYYY-MM-DD'),
    repeat: false,
  });
  // const event = JSON.stringify(taskInfo);
  useEffect(() => {
    api.getTask(taskInfo).then(function (task) {
      setTask(task);
    });
  }, [taskInfo]);
}

// function renderEventContent(TaskInfo(1)) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

//const displayDate2 = new Date('2022/11/16');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EventCalendar() {
  const api = new Api();

  const [task, setTask] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    api.getTask(1).then(function (task) {
      setTask(task);
    });
  }, []);

  const tasks = task ? [task] : [];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="event-calendar">
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <div className="event-calendar-main">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                //This is for the toolbar above the calendar.
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridWeek dayGridMonth listWeek',
                }}
                editable={true}
                //This allows the dates to be selectable
                selectable={true}
                dayMaxEvents={true}
                eventMaxStack={true}
                weekends={true}
                // eslint-disable-next-line @typescript-eslint/no-shadow
                events={tasks.map(task => ({ title: task.name, start: task.date }))}
                datesSet={console.debug}
              />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

// handleDateSelect = selectInfo => {
//   let title = prompt('Please enter a new title for your event');
//   let description = prompt('Please give your event a description');
//   // let startTime = prompt("Please give your event's starting time")
//   // let endTime =  prompt("Please give your event's ending time")
//
//   let calendarApi = selectInfo.view.calendar;
//
//   calendarApi.unselect();
//
//   if (title) {
//     calendarApi.addEvent({
//       id: createEventId(),
//       title,
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//       allDay: selectInfo.allDay,
//       extendedProps: {
//         description: description,
//       },
//     });
//   }
// };
// }
