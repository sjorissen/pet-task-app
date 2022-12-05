//import * as fs from 'fs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Box, Divider, IconButton, ListItemButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CheckBox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../api/api';
//import { getTask } from '../api/mocks';
//import { TaskType } from '../api/models';
import database, { auth } from '../api/firebase-config';
import EventCalendar from '../calendar/EventCalendar';
import './taskList.css';
import formStyles from '../components/Forms.module.scss';
import Modal from '../components/Modal';
import styles from '../pet/petView.module.scss';
// eslint-disable-next-line import/order
//import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';

//const api = new Api();
//console.log(api.getTask(1));

function Task(id, name, desc, startD, endD, repetition) {
  this.id = id;
  this.name = name;
  this.desc = desc;
  this.startD = startD;
  this.endD = endD;
  this.repetition = repetition;
}

/*
function getTask(task) {
  return task;
}

function TaskList() {
  taskList = [];
}

function AddTaskToList(task) {
  taskList.push(task);
}

function getTaskList() {
  return taskList;
}

 */

const dateInTZ = (date = new Date()) => {
  if (typeof date === 'string') date = new Date(date);
  else if (!(date instanceof Date)) date = date.toDate();
  const zeroPadded = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${zeroPadded(date.getMonth() + 1)}-${zeroPadded(date.getDate())}`;
};

export function TaskToScreen() {
  // const [task, setTask] = useState({
  //   name: '',
  //   description: '',
  //   repeat: false,
  //   done: false,
  //   date: '2022-01-01',
  // });
  const [tasks, setTasks] = useState([]);

  const user = auth.currentUser;
  const uid = user.uid;
  const taskid = '-NGtVoRCyZA8_m2FYju0';

  let today = new Date();
  let start = dateInTZ();
  const testdate = start;

  const api = new Api({ db: database });

  const fetchAndDisplayTasks = (userid, date) => {
    api
      .getTasksByDate(userid, date)
      .then(function (_tasks) {
        setTasks(_tasks);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAndDisplayTasks(uid, testdate);
  }, [uid, testdate, taskid]);

  window.api = api;

  const handleChecked = idx => {
    tasks[idx].done = !tasks[idx].done;
    setTasks([...tasks]);
    const { id, date, done } = tasks[idx];
    api.editTask(user.uid, { id, date, done }).then(console.log).catch(console.error);
  };

  const handleDelete = idx => {
    api.deleteTask(user.uid, tasks[idx]);
    tasks.splice(idx, 1);
    setTasks([...tasks]);
    // console.log('🤫');
  };

  const [editingTask, setEditingTask] = useState(null);
  const handleOpen = idx => setEditingTask(idx);
  const handleCloseEdit = () => setEditingTask(null);

  const updateTask = (idx, editedTask) => {
    const originalTask = tasks[idx];
    const sameDate = editedTask.date === originalTask.date;

    // edit the task in local state... if it's no longer on today's date,
    // remove it from local state
    tasks[idx] = editedTask;
    if (!sameDate) tasks.splice(idx, 1);
    setTasks([...tasks]);

    api.editTask(user.uid, editedTask).then(() => {
      if (!sameDate) api.deleteTask(user.uid, originalTask);
    });
    handleCloseEdit();
  };
  // eslint-disable-next-line no-restricted-globals

  return (
    <>
      <NewTask
        onCreate={() => {
          fetchAndDisplayTasks(uid, testdate);
        }}
      />
      <div id="tasks">
        <ul>
          {tasks.map((task, idx) => (
            <div key={task.id}>
              <Tooltip
                title={
                  <Typography fontSize={20}>
                    Description: {task.description} Date: {task.date}
                  </Typography>
                }
                arrow
                sx={{ width: 100 }}>
                <ListItemButton sx={{}}>
                  <CheckBox checked={task.done} onClick={() => handleChecked(idx)} />
                  {/*<ListItemText primary={task.name} />*/}
                  <ListItemText
                    primary={
                      task.done ? (
                        <Typography sx={{ textDecoration: 'line-through' }}>
                          {tasks[idx].name}
                        </Typography>
                      ) : (
                        <Typography>{tasks[idx].name}</Typography>
                      )
                    }
                  />
                  <IconButton
                    variant="secondary"
                    className="Edit-Btn"
                    onClick={() => handleOpen(idx)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    variant="secondary"
                    className="Delete-Btn"
                    onClick={() => handleDelete(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
              </Tooltip>
              <Divider />
            </div>
          ))}
        </ul>
      </div>
      <Modal open={editingTask !== null} onClose={handleCloseEdit}>
        <div style={{ width: '500px' }}>
          <EditTask
            task={tasks[editingTask]}
            taskUpdate={editedTask => updateTask(editingTask, editedTask)}
          />
        </div>
      </Modal>
    </>
  );
}

export default function NewTask({ onCreate = () => {} }) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [dueDate, setDueDate] = useState(new Date());

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const options = ['Choose an Option:', 'Daily', 'Weekly', 'None'];

  const api = new Api({ db: database });

  const toggleModal = () => {
    setModal(!modal);
  };

  const [openCal, setCal] = useState(false);
  const handleOpen = () => setCal(true);
  const handleCloseCal = () => setCal(false);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  /*const name = document.getElementById('taskName');
  const desc = document.getElementById('description');
  const startD = document.getElementById('start');
  const endD = document.getElementById('end');
  const repetition = document.getElementById('lock-menu');*/
  //const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    let sD = dateInTZ(dueDate);
    console.log(dueDate, sD);

    //let eD = endDate.toString();
    let id = 1;

    //var taskList = new TaskList();
    let myTask = new Task(id, title, desc, sD, selectedIndex);

    if (title && (desc || !desc) && dueDate && selectedIndex) {
      console.log('Task ID: ' + myTask.id);
      console.log('Task name: ' + myTask.name);
      console.log('Description: ' + myTask.desc);
      console.log('Start date: ' + myTask.startD);
      // console.log('End date: ' + myTask.endD);
      console.log('Repetition: ' + myTask.repetition);
      //AddTaskToList(myTask);
    }
    toggleModal();

    const user = auth.currentUser;

    const task = {
      id: '',
      userid: user.uid,
      name: myTask.name,
      description: myTask.desc,
      repeat: false,
      done: false,
      date: myTask.startD,
    };

    api.addTask(task.userid, task).then(() => {
      onCreate();
    });
    // SaveTask({ api }, myTask.name, myTask.desc, myTask.startD, myTask.repetition);
    //TaskToScreen();
  };

  return (
    <>
      <div id="myDIV" className="header">
        <IconButton variant="secondary" onClick={toggleModal} className="Add-Btn">
          <AddCircleIcon />
        </IconButton>
        <IconButton variant="secondary" onClick={handleOpen} className="Calendar-Btn">
          <CalendarMonthIcon />
        </IconButton>

        <Modal
          open={openCal}
          onClose={handleCloseCal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div>
            <EventCalendar />
          </div>
        </Modal>
        <h2>My Task List</h2>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {modal && (
          <div className="modal-content">
            <div onClick={toggleModal} className="modal-content"></div>

            <div className={formStyles.form}>
              <Typography variant="h3" className={formStyles.heading}>
                New Task
              </Typography>
              <div>
                <TextField
                  required
                  onChange={e => setTitle(e.target.value)}
                  id="taskName"
                  label="Task Name:"
                  variant="outlined"
                />
              </div>

              <div>
                <TextField
                  sx={[{ pb: 5 }]}
                  id="description"
                  onChange={e => setDesc(e.target.value)}
                  label="Description:"
                  variant="outlined"
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  id="due"
                  label="Due Date"
                  dateFormat="MM/dd/yyyy"
                  //selected={startDate}
                  value={dueDate}
                  onChange={date => date && setDueDate(date)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>

              <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}>
                <ListItem
                  button
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}>
                  <ListItemText primary="Repeat: " secondary={options[selectedIndex]} />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}>
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>

              <Button variant="contained" type="submit">
                Submit
              </Button>
              <button className="close-modal" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

function EditTask({ task, taskUpdate }) {
  const [error, setError] = useState(null);
  const [dueDate, setDueDate] = useState(task.date);

  const onSubmit = event => {
    event.preventDefault();
    setError(null);
    const editedTask = {
      ...task,
      ...Object.fromEntries(new FormData(event.target)),
      date: dateInTZ(dueDate),
    };
    taskUpdate(editedTask);
  };

  return (
    <Box>
      <form onSubmit={onSubmit} className={formStyles.form}>
        {error && <Alert severity="error">Something bad: {error}</Alert>}
        <Typography variant="h3" className={formStyles.heading}>
          Edit Task
        </Typography>
        <TextField
          defaultValue={task.name}
          variant="outlined"
          label="Task Name"
          name="name"
          type="text"
          size="small"
          required
          width={100}
        />
        <TextField
          defaultValue={task.description}
          variant="outlined"
          label="Task Description"
          name="description"
          type="text"
          size="small"
        />
        {/*<input name="date" hidden value={dueDate} />*/}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            id="due"
            label="Due Date"
            dateFormat="MM/dd/yyyy"
            value={dueDate}
            onChange={date => {
              setDueDate(date);
            }}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}

function SaveTask({ api }, title, desc, dueDate, selectedIndex) {
  const user = auth.currentUser;
  const task = {
    id: '',
    userid: user.uid,
    name: title,
    description: desc,
    repeat: false,
    done: false,
    date: dueDate,
  };

  api.addTask(user.uid, task);
}

// function UpdateTask({ api }, title, desc, dueDate, selectedIndex) {
//   const task = {
//     id: '',
//     userid: 'xEctZj50XFE34XzJD18LYVtO5hIb',
//     name: title,
//     description: desc,
//     repeat: false,
//     done: false,
//     date: dueDate,
//   };
//
//   api.editTask('xEctZj50XFE34XzJD18LYVtO5hIb', task);
// }
