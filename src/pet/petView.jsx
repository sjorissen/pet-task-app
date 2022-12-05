import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Alert, Box, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Api from '../api/api';
import database, { auth } from '../api/firebase-config';
import formStyles from '../components/Forms.module.scss';
import { usePet } from '../components/Layout';
import Modal from '../components/Modal';
import { isUpdateTime, checkTasks, checkAge } from './petUpdate';
import styles from './petView.module.scss';
import { Sprite } from './Sprite';

function calcHealth({ stage, health }) {
  let percentage, max;
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
  const [checked, setChecked] = useState(0);
  const [pet, setPet] = usePet();
  // const [pet, setPet] = useState({
  //   name: '',
  //   species: 'cat',
  //   color: 'green',
  //   stage: 'child',
  //   health: 100,
  //   status: 'happy',
  //   accessories: [],
  // });
  const { name, color, stage, status } = pet;

  const userid = auth.currentUser.uid;

  const api = new Api({ db: database });

  useEffect(() => {
    const timer = setTimeout(() => {
      // force a state update to cause this useEffect to trigger again
      setChecked(c => c + 1);
      if (isUpdateTime(pet)) {
        const checkDate = new Date(pet.nextUpdate);
        const nextUpdate = new Date(
          checkDate.getFullYear(),
          checkDate.getMonth(),
          checkDate.getDate() + 1,
          checkDate.getHours(),
          checkDate.getMinutes()
        );

        const updates = {
          ...checkAge(pet),
          nextUpdate: nextUpdate.toISOString(),
        };

        api.updatePet(userid, updates);
        const updatedPet = {
          ...pet,
          ...updates,
        };
        setPet(updatedPet);
        checkTasks(userid, pet.nextUpdate, updatedPet, newHealth => {
          setPet({
            ...updatedPet,
            health: newHealth,
            status: newHealth === 0 ? 'dead' : updatedPet.status,
          });
          api.updatePet(userid, {
            health: newHealth,
            status: updatedPet.status,
          });
        });
      }
      // every 60 seconds
    }, 60 * 1000);
    return () => clearTimeout(timer);
  }, [checked]);

  const [percent, current, max, healthClass] = calcHealth(pet);

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
  const deletePet = uid => {
    api.deletePet(uid).then(() => setPet(undefined));
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
          {pet.status !== 'dead' ? (
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
          ) : (
            <Box className={styles.petViewBottom}>
              <Button
                variant="contained"
                className={styles.newPetButton}
                onClick={() => deletePet(userid)}>
                Create New Pet
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Modal open={open} onClose={handleClose}>
        <CustomizationMenu pet={pet} petUpdate={updatePet} />
      </Modal>
    </>
  );
}

const MS_PER_DAY = 1000 * 3600 * 24;
function CustomizationMenu({ pet, petUpdate }) {
  const [error, setError] = useState(null);
  const petAge = Math.floor((new Date() - new Date(pet.birthday)) / MS_PER_DAY);

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
          value={`${petAge} days old`}
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
