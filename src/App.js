// import logo from './logo.svg';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import EventCalendar from './calendar/EventCalendar';
// import { NewTask } from './tasks/taskList';
import './App.css';
import './styles/mainPage.css';

function App() {
  {
    return (
      //==================== This is for the top navbar ===================
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {/*//==================== This is for the top navbar =================== //*/}
        {/*eslint-disable-next-line react/jsx-filename-extension*/}
        <Box id="navbar">
          <AppBar id="appBar">
            <Toolbar>
              <Typography id="furryMinder" variant="h6" component="div">
                Furry-Minder
              </Typography>
              <Button id="login">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        {/*//This will be for the layout of the main webpage, should be a responsive, 2 column format*/}
        <div class="row">
          <div class="column left">
            <h2>Column 1</h2>
            <p>Some text..</p>
          </div>
          <div class="column right">
            <h2>Column 2</h2>
            <p>Some text..</p>
          </div>
        </div>
      </>
    );
  }

  // eslint-disable-next-line react/jsx-filename-extension
  //return <EventCalendar />;
}

export default App;
