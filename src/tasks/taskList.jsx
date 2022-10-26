import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import DatePicker from 'react-date-picker';
import './taskList.css'

//import Modal from '@mui/material/Modal';
//import Button from '@mui/material/Button';

export function NewTask(){
    const [modal, setModal] = useState(false);
    //const [open, setOpen] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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

                 <TextField
                     id = "date"
                     label = "Date"
                     variant = "standard"
                 />

                 <DatePicker
                     required
                     selected = {startDate}
                     onChange = {(date) => setStartDate(date)}
                     selectsStart
                     startDate = {startDate}
                     endDate = {endDate}
                 />

                 <DatePicker
                     required
                     selected = {endDate}
                     onChange = {(date) => setEndDate(date)}
                     selectsEnd
                     startDate={startDate}
                     endDate={endDate}
                     minDate={startDate}
                  />


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


