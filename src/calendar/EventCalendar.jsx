// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import Api from '../api/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';

// let testTitle = testTask.name;
//
// let testDescription = testTask.description;
//
// let testDate = testTask.date;

// function handleEventClick = clickInfo() => {
//   // eslint-disable-next-line no-restricted-globals
//   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     clickInfo.event.remove();
//   }
// };
//
// function handleEvents = events => {
//   this.setState({
//     currentEvents: events,
//   });
// };
//This will render the event information for the calendar

function RenderEventContent({ taskInfo }) {
  const api = new Api();

  const [{ name, description, date, repeat }, setTask] = useState({
    name: '',
    description: '',
    date: '',
    repeat: false,
  });

  useEffect(() => {
    api.getTask(taskInfo).then(function (task) {
      setTask(task);
    });
  }, [taskInfo]);

  const dispDate = new Date(date);

  return (
    <>
      <b>{date}</b>
      <b>
        <i>{name + ':'}</i>
      </b>
      <i>{description}</i>
    </>
  );
}

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
  // //This is to let the calendar show weekends, also not needed. User cannot manipulate if weekends are visible
  // const weekendVisible = useState(true);
  //This is to show pre-made events
  const currentEvents = useState([]);

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
              {/*{this.renderSidebar()}*/}
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                //This is for the toolbar above the calendar.
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridWeek dayGridMonth listWeek',
                }}
                initialView="dayGridWeek"
                editable={true}
                //This allows the dates to be selectable
                selectable={true}
                //---------- selectMirror allows the user to see a placeholder when dragging the event
                selectMirror={true}
                dayMaxEvents={true}
                eventMaxStack={true}
                weekends={true}
                //If we hardcode any initial events
                initialEvents={INITIAL_EVENTS}
                eventContent={RenderEventContent}
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
