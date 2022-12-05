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
import React, { useEffect, useState } from 'react';
import Api from '../api/api';
import database, { auth } from '../api/firebase-config';
import EventCalendar from '../calendar/EventCalendar';
import './taskList.css';
import formStyles from '../components/Forms.module.scss';
import Modal from '../components/Modal';

const dateInTZ = (date = new Date()) => {
  if (typeof date === 'string') date = new Date(date);
  if (!(date instanceof Date)) date = date.toDate();
  const zeroPadded = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${zeroPadded(date.getMonth() + 1)}-${zeroPadded(date.getDate())}`;
};

export function TaskToScreen() {
  const [tasks, setTasks] = useState([]);

  const user = auth.currentUser;
  const uid = user.uid;

  let start = dateInTZ();
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
    fetchAndDisplayTasks(uid, start);
  }, [uid, start]);

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
  const handleEditing = idx => setEditingTask(idx);
  const handleCloseEdit = () => setEditingTask(null);

  const [addingTask, setAddingTask] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

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

  return (
    <>
      <div id="myDIV" className="header">
        <IconButton variant="secondary" onClick={() => setAddingTask(true)} className="Add-Btn">
          <AddCircleIcon />
        </IconButton>
        <IconButton
          variant="secondary"
          onClick={() => setCalendarOpen(true)}
          className="Calendar-Btn">
          <CalendarMonthIcon />
        </IconButton>
        <h2>My Task List</h2>
      </div>
      <NewTask
        open={addingTask}
        onClose={() => setAddingTask(false)}
        onCreate={() => {
          fetchAndDisplayTasks(uid, start);
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
                    onClick={() => handleEditing(idx)}>
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
      {editingTask !== null && (
        <EditTask
          open={handleEditing}
          onClose={handleCloseEdit}
          task={tasks[editingTask]}
          taskUpdate={editedTask => updateTask(editingTask, editedTask)}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      <Modal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div>
          <EventCalendar onEditsMade={() => fetchAndDisplayTasks(uid, start)} />
        </div>
      </Modal>
    </>
  );
}

export default function NewTask({ open, onClose, onCreate = () => {} }) {
  const user = auth.currentUser;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const menuOpen = Boolean(anchorEl);

  const options = ['Choose an Option:', 'Daily', 'Weekly', 'None'];

  const api = new Api({ db: database });

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (open) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const handleSubmit = e => {
    e.preventDefault();

    api
      .addTask(user.uid, {
        userid: user.uid,
        name: title,
        description: desc,
        repeat: false,
        done: false,
        date: dateInTZ(dueDate),
      })
      .then(() => {
        onCreate();
      });

    onClose();
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {open && (
          <div className="modal-content">
            <div onClick={onClose} className="modal-content"></div>
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
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={menuOpen ? 'true' : undefined}
                  onClick={handleClickListItem}>
                  <ListItemText primary="Repeat: " secondary={options[selectedIndex]} />
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
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
              <button className="close-modal" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export function EditTask({ task, taskUpdate, open, onClose }) {
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
    <Modal open={open} onClose={onClose}>
      <div style={{ width: '500px' }}>
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
      </div>
    </Modal>
  );
}
