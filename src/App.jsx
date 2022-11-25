// import logo from './logo.svg';
import { AppBar, Box, Button, Grid, Paper, styled, Toolbar, Typography } from '@mui/material';
import EventCalendar from './calendar/EventCalendar';
// import { NewTask } from './tasks/taskList';
import './App.css';
import './styles/mainPage.css';
import NewTask, { TaskToScreen } from './tasks/taskList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        {/* // ==================== This is for the top navbar ===================
     // eslint-disable-next-line react/jsx-filename-extension */}
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

        <Box id="componentsGrid" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <NewTask />
              {/*<Item>xs = 4</Item>*/}
            </Grid>
            <Grid item xs>
              <Item>xs=6</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-filename-extension
  //return <EventCalendar />;
}

export default App;
