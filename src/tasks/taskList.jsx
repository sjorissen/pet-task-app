import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './taskList.css'

//import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';

export function NewTask(){
    const [modal, setModal] = useState(false);
    //const [open, setOpen] = useState(false);

    const [startDate, setStartDate] = useState([null,null]);
    const [endDate, setEndDate] = useState([null,null]);

    const toggleModal = () => {
        setModal(!modal);
    }




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
                         label="End Date"
                         value={endDate}
                         onChange={(newValue) => {
                             setEndDate(newValue);
                         }}
                         renderInput={(params) => <TextField {...params} />}
                     />
                 </LocalizationProvider>



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


