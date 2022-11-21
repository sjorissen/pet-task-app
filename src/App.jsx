// import logo from './logo.svg';
// import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
// import EventCalendar from './calendar/EventCalendar';
// import { NewTask } from './tasks/taskList';
import './App.css';
import './styles/mainPage.css';
import { CssBaseline } from '@mui/material';
import PetView from './pet/petView';

function App() {
  return (
    <>
      <CssBaseline />
      <PetView />
    </>
  );
}

export default App;
