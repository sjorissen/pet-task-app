import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Alert, Box, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Api from '../api/api';
import database from '../api/firebase-config';
import formStyles from '../components/Forms.module.scss';
import Modal from '../components/Modal';
import styles from './petView.module.scss';
import { Sprite } from './Sprite';

function calcHealth({ stage, health }) {
  let [percentage, max] = [0, 100];
  switch (stage) {
    case 'child':
      [percentage, max] = [Math.round((health / 50) * 100), 50];
      break;
    case 'teen':
      [percentage, max] = [Math.round((health / 75) * 100), 75];
      break;
    default:
      [percentage, max] = [Math.round((health / 100) * 100), 100];
      break;
  }
  return [
    percentage,
    health,
    max,
    percentage <= 30 ? styles.low : percentage <= 50 ? styles.medium : styles.high,
  ];
}

export default function PetView() {
  const [pet, setPet] = useState({
    name: '',
    species: 'cat',
    color: 'green',
    stage: 'child',
    health: 100,
    status: 'happy',
    accessories: [],
  });
  const { name, species, color, stage, status, accessories } = pet;

  const [percent, current, max, healthClass] = calcHealth(pet);

  console.log(percent, current, max);

  const userid = 'xEctZj50XFE34XzJD18LYVtO5hIb';
  const id = '-aslkfjepa';

  const api = new Api({ db: database });
  useEffect(() => {
    api.getPet(userid, id).then(function (_pet) {
      setPet(_pet);
    });
  }, [userid, id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(prevState => !prevState);
  const updatePet = _pet => {
    console.debug(_pet);
    api
      .updatePet(userid, _pet)
      .then(() => setPet(_pet))
      .catch(console.error);
  };

  return (
    <>
      {!!name && (
        <Box className={styles.petView}>
          <Box className={styles.petName}>
            <h2>{name}</h2>
          </Box>
          <Box className={styles.spriteContainer}>
            <Sprite color={color} status={status} stage={stage} />
          </Box>
          <Box className={styles.petViewBottom}>
            <Box className={clsx(styles.healthWrapper, healthClass)}>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={percent}
                className={styles.healthBar}
                sx={{ height: 40 }}
              />
              <div className={styles.healthLabel}>HP </div>

              <div className={styles.healthValue}>
                {current}/{max}
              </div>
            </Box>
            <IconButton onClick={handleOpen} className={styles.customButton}>
              <CheckroomIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <Modal open={open} onClose={handleClose}>
        <CustomizationMenu pet={pet} petUpdate={updatePet} />
      </Modal>
    </>
  );
}

function CustomizationMenu({ pet, petUpdate }) {
  const [error, setError] = useState(null);

  // const handleName = event => {
  //   setName(event.target);
  // };

  const onSubmit = event => {
    event.preventDefault();
    setError(null);

    const update = Object.fromEntries(new FormData(event.target));
    console.debug(update);
    petUpdate({ ...pet, ...update });
  };
  // return <h1>sup</h1>;

  return (
    <Box className={styles.formContainer}>
      <form onSubmit={onSubmit} className={formStyles.form}>
        {error && <Alert severity="error">Something bad: {error}</Alert>}
        <Typography variant="h3" className={formStyles.heading}>
          Customize Pet
        </Typography>
        <TextField
          defaultValue={pet.name}
          variant="outlined"
          label="Pet Name"
          name="name"
          type="text"
          size="small"
          required
        />
        <TextField
          value={`${pet.age} days old`}
          variant="outlined"
          label="Pet Age"
          type="text"
          size="small"
        />
        <TextField
          select
          SelectProps={{ native: true }}
          defaultValue={pet.color}
          variant="outlined"
          label="Pet Color"
          name="color"
          size="small">
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="void">Void</option>
        </TextField>
        {/* TODO: change pet species */}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
