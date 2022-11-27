//import * as fs from 'fs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, IconButton, ListItemButton } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../api/api';
import database from '../api/firebase-config';
//import { getTask } from '../api/mocks';
import { TaskType } from '../api/models';
import EventCalendar from '../calendar/EventCalendar';
import './taskList.css';

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

export function TaskToScreen() {
  // const [task, setTask] = useState({
  //   name: '',
  //   description: '',
  //   repeat: false,
  //   done: false,
  //   date: '2022-01-01',
  // });
  const [tasks, setTasks] = useState([]);

  const uid = 'xEctZj50XFE34XzJD18LYVtO5hIb';
  const taskid = '-NGtVoRCyZA8_m2FYju0';
  const testdate = '2022-11-15';

  const api = new Api({ db: database });

  const fetchAndDisplayTasks = (userid, date) => {
    api
      .getTasksByDate(userid, date)
      .then(function (_tasks) {
        setTasks(_tasks);
      })
      .catch(console.warn);
  };

  useEffect(() => {
    fetchAndDisplayTasks(uid, testdate);
  }, [uid, testdate, taskid]);

  window.api = api;

  console.log(tasks);
  return (
    <>
      <NewTask
        onCreate={() => {
          fetchAndDisplayTasks(uid, testdate);
        }}
      />
      <ul>
        {tasks.map(task => (
          <ListItemButton>
            <ListItemText primary={task.name} />
            {/*key={task.id}>{task.name}*/}
          </ListItemButton>
        ))}
      </ul>
    </>
  );
}

export default function NewTask({ onCreate = () => {} }) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

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

    let sD = dueDate.toISOString().split('T')[0];
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

    const task = {
      id: '',
      userid: 'xEctZj50XFE34XzJD18LYVtO5hIb',
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

      <form class="form" onSubmit={handleSubmit}>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2> New Task</h2>
              <div>
                <TextField
                  required
                  onChange={e => setTitle(e.target.value)}
                  id="taskName"
                  label="Task Name:"
                  variant="standard"
                />
              </div>

              <div>
                <TextField
                  sx={[{ pb: 5 }]}
                  id="description"
                  onChange={e => setDesc(e.target.value)}
                  label="Description:"
                  variant="standard"
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

              <button className="close-modal" onClick={toggleModal}>
                Close
              </button>

              <button
                className="save-modal"
                //onClick={}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

// export type TaskType = {
//   id: number;
//   userid: number;
//   name: string;
//   description: string;
//   repeat: boolean;
//   done: boolean;
//   date: string;
// };

function SaveTask({ api }, title, desc, dueDate, selectedIndex) {
  const task = {
    id: '',
    userid: 'xEctZj50XFE34XzJD18LYVtO5hIb',
    name: title,
    description: desc,
    repeat: false,
    done: false,
    date: dueDate,
  };

  api.addTask('xEctZj50XFE34XzJD18LYVtO5hIb', task);
}
