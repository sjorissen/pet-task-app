// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import Api from '../api/api';
import { INITIAL_EVENTS, createEventId } from './event-utils';

//const api = new Api();
// let testTask = api.getTask(1);
//
// let testTitle = testTask.name;
//
// let testDescription = testTask.description;
//
// let testDate = testTask.date;
// function RenderTask({ taskId }) {
//   const [{ name, description }, setTask] = useState({
//     name: '',
//     description: '',
//   });
//
//   const api = new Api();
//
//   useEffect(() => {
//     api.getTask(taskId).then(function (task) {
//       setTask(task);
//     });
//   }, [taskId]);
//   return(
//
//   )
// }

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
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <b>
        <i>{eventInfo.event.title + ':'}</i>
      </b>
      <i>{eventInfo.event.extendedProps.description}</i>
    </>
  );
}

export default function EventCalendar() {
  // //This is to let the calendar show weekends, also not needed. User cannot manipulate if weekends are visible
  // const weekendVisible = useState(true);
  //This is to show pre-made events
  const currentEvents = useState([]);

  return (
    <div className="event-calendar">
      {/*{this.renderSidebar()}*/}
      <div className="event-calendar-main">
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
          eventContent={renderEventContent}

          // select={this.handleDateSelect}
          // eventClick={this.handleEventClick}
          // eventsSet={this.handleEvents}

          // eventMouseEnter={handleMouseEnter}
          // eventMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
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
