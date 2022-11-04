// import logo from './logo.svg';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import './App.css';
import './calendar/EventCalendar';
import { EventCalendar } from './calendar/EventCalendar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <EventCalendar />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
