// import logo from './logo.svg';
import { AppBar, Box, Button, Grid, Paper, styled, Toolbar, Typography } from '@mui/material';
import { borders } from '@mui/system';
import EventCalendar from './calendar/EventCalendar';
// import { NewTask } from './tasks/taskList';
import './App.css';
import './styles/mainPage.css';
import Layout from './components/Layout';
import logo from './logo/logoMan.png';
import PetView from './pet/petView';
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
      <Layout>
        <Box id="componentsGrid" sx={{ flexGrow: 1, height: '90.5vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ ml: 5 }}>
              <TaskToScreen />
              {/*<Item>xs = 4</Item>*/}
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs sx={{ mr: 5 }}>
              <PetView />
            </Grid>
          </Grid>
        </Box>
      </Layout>
    );

    // eslint-disable-next-line react/jsx-filename-extension
    //return <EventCalendar />;
  }
}
export default App;
