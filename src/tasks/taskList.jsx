import React, {useRef, useState} from "react";
//import * as fs from 'fs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './taskList.css'

//import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';

function Task(name, desc, startD){
    this.name = name;
    this.desc = desc;
    this.startD = startD;
    /*this.endD = endD;
    this.repetition = repetition;

     */
};





export function NewTask(){
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const[desc, setDesc] = useState('');


    const [startDate, setStartDate] = useState([null,null]);
    const [endDate, setEndDate] = useState([null,null]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);

    const options = [
      'Choose an Option:',
        'Daily',
        'Weekly',
        'None'
    ];



    const toggleModal = () => {
        setModal(!modal);
    }

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    /*const name = document.getElementById('taskName');
    const desc = document.getElementById('description');
    const startD = document.getElementById('start');
    const endD = document.getElementById('end');
    const repetition = document.getElementById('lock-menu');*/
    //const inputRef = useRef(null);



    const handleSubmit = (e) => {
        e.preventDefault()

        var myTask = new Task(title, desc, startDate);

       if(title && desc && startDate){
            console.log("Task name: " + myTask.name);
            console.log("Description: " + myTask.desc);
            console.log("Start date: " + myTask.startD);
        }

    }

    return (
        <>
            <div id="myDIV" className="header">
                <h2>My Task List</h2>
            </div>


        <button
            onClick = {toggleModal}
            className = "Add-Btn">
            +
        </button>

            <form onSubmit={handleSubmit}>
            {modal && (
         <div className = "modal">
             <div onClick={toggleModal}
                 className = "overlay" ></div>
             <div className = "modal-content">



                 <h2> New Task</h2>
                 <TextField
                     required
                     onChange = {(e) => setTitle(e.target.value)}
                     id = "taskName"
                     label = "Task Name:"
                     variant = "standard"
                 />

                 <TextField
                     id = "description"
                     onChange = {(e) => setDesc(e.target.value)}
                     label = "Description:"
                     variant = "standard"
                 />

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                         required
                         id = "start"
                         label="Start Date"
                         value={startDate}
                         onChange={( e) =>
                             setStartDate(e.target.value)
                         }
                         renderInput={(params) => <TextField {...params} />}
                     />
                 </LocalizationProvider>

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                         required
                         id = "end"
                         label="End Date"
                         value={endDate}
                         onChange={(newValue) => {
                             setEndDate(newValue);
                         }}
                         renderInput={(params) => <TextField {...params} />}
                     />
                 </LocalizationProvider>

                 <List
                     component="nav"
                     aria-label="Device settings"
                     sx={{ bgcolor: 'background.paper' }}
                 >
                     <ListItem
                         button
                         id="lock-button"
                         aria-haspopup="listbox"
                         aria-controls="lock-menu"
                         aria-label="when device is locked"
                         aria-expanded={open ? 'true' : undefined}
                         onClick={handleClickListItem}
                     >
                         <ListItemText
                             primary="Repeat: "
                             secondary={options[selectedIndex]}
                         />
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
                     }}
                 >
                     {options.map((option, index) => (
                         <MenuItem
                             key={option}
                             disabled={index === 0}
                             selected={index === selectedIndex}
                             onClick={(event) => handleMenuItemClick(event, index)}
                         >
                             {option}
                         </MenuItem>
                     ))}
                 </Menu>


                 <button
                 className = 'close-modal'
                 onClick = {toggleModal}
                 >Close</button>

                 <button
                     className = 'save-modal'
                     onClick = {SaveTask()}
                 >Save</button>

             </div>
         </div>
                )}
            </form>
    </>


    );


    function SaveTask(){


       // var myTask = new Task(title);
       // console.log(myTask.name);

        /*var data =
            '\r Name: ' + myTask.name + '\r\n ' //+
            /*'Description: ' + task.desc + '\r\n ' +
            'Start Date: ' + task.startD+ '\r\n ' +
            'End Date: ' + task.endD + '\r\n' +
            'Repeated: ' + task.repetition;*/

           // console.log(taskName);




    }
}


