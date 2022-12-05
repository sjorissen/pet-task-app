// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Api from '../api/api';
import database, { auth } from '../api/firebase-config';
import { EditTask } from '../tasks/taskList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '5px solid #175BA6',
  boxShadow: 24,
  p: 4,
};

export default function EventCalendar({ onEditsMade = () => {} }) {
  const api = new Api({ db: database });
  //--------------- GET CURRENT USER ---------------
  const user = auth.currentUser;
  //--------------- GET CURRENT USER ---------------

  const [tasks, setTasks] = useState([]);
  const [daterange, setDaterange] = useState([]);

  useEffect(() => {
    if (!daterange.length) return;
    const start = daterange[0].toISOString().slice(0, 10);
    const end = daterange[1].toISOString().slice(0, 10);
    api
      .getTasksByDate(user.uid, start, end)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(tasks => {
        setTasks(tasks);
      })
      .catch(console.error);
  }, [daterange]);

  // idx of task being edited
  const [editingTask, setEditingTask] = useState(null);
  const updateTask = updatedTask => {
    api
      .editTask(user.uid, updatedTask)
      .then(() => {
        const originalTask = tasks[editingTask];
        tasks[editingTask] = updatedTask;
        if (updateTask.date !== originalTask.date) {
          tasks.slice(editingTask, 1);
          api.deleteTask(user.uid, originalTask);
        }
        setTasks([...tasks]);
        onEditsMade();
      })
      .catch(console.error);
    setEditingTask(null);
  };

  return (
    <>
      <div className="event-calendar">
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
              events={tasks.map(task => ({
                id: task.id,
                title: task.name,
                start: task.date,
              }))}
              eventClick={({ event }) => {
                const idx = tasks.findIndex(t => t.id === event.id);
                if (idx !== -1) setEditingTask(idx);
              }}
              datesSet={({ start, end }) => setDaterange([start, end])}
            />
          </div>
        </Box>
      </div>
      {editingTask !== null && (
        <EditTask
          open={true}
          onClose={() => setEditingTask(null)}
          task={tasks[editingTask]}
          taskUpdate={updateTask}
        />
      )}
    </>
  );
}
