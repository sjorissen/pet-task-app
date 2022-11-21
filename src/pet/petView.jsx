import CheckroomIcon from '@mui/icons-material/Checkroom';
import {
  Alert,
  Box,
  Grid,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Api from '../api/api';
import database from '../api/firebase-config';
import styles from './petView.module.css';
import { Sprite } from './Sprite';

export default function PetView({ src }) {
  const [{ name, species, color, age, health, status, accessories }, setPet] = useState({
    name: '',
    species: 'cat',
    color: 'green',
    age: 'child',
    health: 100,
    status: 'happy',
    accessories: [],
  });

  const userid = 'xEctZj50XFE34XzJD18LYVtO5hIb';
  const id = '-aslkfjepa';

  const api = new Api({ db: database });
  useEffect(() => {
    api.getPet(userid, id).then(function (pet) {
      setPet(pet);
    });
  }, [userid, id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {!!name && (
        <Box className={styles.petView}>
          <Box className={styles.petName}>
            <h2>{name}</h2>
          </Box>
          <Box className={styles.spriteContainer}>
            <Sprite color={color} status={status} age={age} />
          </Box>
          <Box className={styles.petViewBottom}>
            <Box className={styles.healthWrapper}>
              <LinearProgress
                variant="determinate"
                value={health}
                className={styles.health}
                sx={{ height: 40 }}
              />
            </Box>
            <IconButton onClick={handleOpen}>
              <CheckroomIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomizationMenu name={name} />
      </Modal>
    </>
  );
}

function CustomizationMenu({ name }) {
  const [error, setError] = useState(null);

  const onSubmit = event => {
    event.preventDefault();
    setError(null);

    const { name } = Object.fromEntries(new FormData(event.target));
  };

  // const [color, setColor] = useState('');
  // const handleChange = event => {
  //   setColor(event.target.value);
  // };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        border: 2,
        boxShadow: 24,
        p: 4,
      }}>
      <form onSubmit={onSubmit}>
        {error && <Alert severity="error">Something bad: {error}</Alert>}
        <InputLabel htmlFor="name">Pet Name:</InputLabel>
        <Input name="name" aria-describedby="Pet Name" defaultValue={name} /> <br />
        {/*<Select*/}
        {/*  labelId="species"*/}
        {/*  id="species"*/}
        {/*  value={species}*/}
        {/*  label="Species"*/}
        {/*  onChange={handleChange}*/}
        {/*  >*/}
        {/*  <MenuItem value={cat}>Cat</MenuItem>*/}
        {/*  <MenuItem value={dog}>Dog</MenuItem>*/}
        {/*  <MenuItem value={virus}>Virus</MenuItem>*/}
        {/*</Select>*/}
        {/*<Select labelId="color" id="color" value={color} label="Color" onChange={handleChange}>*/}
        {/*  <MenuItem value={red}>Red</MenuItem>*/}
        {/*  <MenuItem value={yellow}>Yellow</MenuItem value={yellow}>*/}
        {/*  <MenuItem value={blue}>Blue</MenuItem>*/}
        {/*</Select>*/}
        <Button variant="submit" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
