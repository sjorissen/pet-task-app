//import * as fs from 'fs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, ListItemButton } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../api/api';
import './taskList.css';
import { getTask } from '../api/mocks';

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

export function TaskToScreen({ taskid }) {
  const [{ name, description, repeat, done, date }, setTask] = useState({
    name: '',
    description: '',
    repeat: false,
    done: false,
    date: '2022-01-01',
  });

  const api = new Api();
  useEffect(() => {
    api.getTask(taskid).then(function (task) {
      setTask(task);
    });
  }, [taskid]);

  const todayTasks = [];
  // let task = api.getTask(1);

  todayTasks.push(
    <ListItemButton>
      <ListItemText primary={name} />
    </ListItemButton>
  );

  return <div>{todayTasks}</div>;
}

export default function NewTask() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const options = ['Choose an Option:', 'Daily', 'Weekly', 'None'];

  const toggleModal = () => {
    setModal(!modal);
  };

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

    let sD = startDate.toString();
    let eD = endDate.toString();
    let id = 1;

    //var taskList = new TaskList();
    let myTask = new Task(id, title, desc, sD, eD, selectedIndex);

    if (title && (desc || !desc) && startDate && endDate && selectedIndex) {
      console.log('Task ID: ' + myTask.id);
      console.log('Task name: ' + myTask.name);
      console.log('Description: ' + myTask.desc);
      console.log('Start date: ' + myTask.startD);
      console.log('End date: ' + myTask.endD);
      console.log('Repetition: ' + myTask.repetition);
      //AddTaskToList(myTask);
    }
    toggleModal();
    //TaskToScreen();
  };

  return (
    <>
      <div id="myDIV" className="header">
        <IconButton variant="secondary" onClick={toggleModal} className="Add-Btn">
          <AddCircleIcon />
        </IconButton>
        <h2>My Task List</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2> New Task</h2>
              <TextField
                required
                onChange={e => setTitle(e.target.value)}
                id="taskName"
                label="Task Name:"
                variant="standard"
              />

              <TextField
                id="description"
                onChange={e => setDesc(e.target.value)}
                label="Description:"
                variant="standard"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  id="start"
                  label="Start Date"
                  dateFormat="MM/dd/yyyy"
                  //selected={startDate}
                  value={startDate}
                  onChange={date => date && setStartDate(date)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  id="end"
                  label="End Date"
                  dateFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={date2 => {
                    date2 && setEndDate(date2);
                  }}
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

              <button className="save-modal" onClick={SaveTask()}>
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );

  function SaveTask() {}
}
