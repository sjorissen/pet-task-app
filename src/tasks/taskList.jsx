import React, {useState} from "react";
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

export function NewTask(){
    const [modal, setModal] = useState(false);
    //const [open, setOpen] = useState(false);

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


            {modal && (
         <div className = "modal">
             <div onClick={toggleModal}
                 className = "overlay"></div>
             <div className = "modal-content">
                 <h2> New Task</h2>
                 <TextField
                     required
                     id = "taskName"
                     label = "Task Name:"
                     variant = "standard"
                 />

                 <TextField
                     id = "description"
                     label = "Description:"
                     variant = "standard"
                 />

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                         required
                         label="Start Date"
                         value={startDate}
                         onChange={(newValue) => {
                             setStartDate(newValue);
                         }}
                         renderInput={(params) => <TextField {...params} />}
                     />
                 </LocalizationProvider>

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                         required
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
             </div>
         </div>
                )}
    </>

    );
}


