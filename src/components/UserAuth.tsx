import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Paper,
} from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import Api from '../api/api';
import db, { auth } from '../api/firebase-config';
import { PetColor, PetStage, PetStatus, Species } from '../api/models';
import styles from './UserAuth.module.scss';

// Takes form entries and serializes to an object. { key: "value" }
const serializeForm = (target: HTMLFormElement): Record<string, string> =>
  Object.fromEntries(new FormData(target)) as Record<string, string>;

export function LoginForm() {
  const [createMode, setCreateMode] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    // Default = GET request at current URL. We don't want that.
    event.preventDefault();
    setError('');
    const { email, password } = serializeForm(event.currentTarget);
    signInWithEmailAndPassword(auth, email, password)
      .then() // happy path handled in layout
      .catch(e => setError(String(e)));
  };

  const onCreate = (event: FormEvent<HTMLFormElement>) => {
    // Default = GET request at current URL. We don't want that.
    event.preventDefault();
    setError('');
    const { email, password, confirmPassword } = serializeForm(event.currentTarget);
    if (password !== confirmPassword) {
      setError('Given passwords do not match.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then() // happy path handled in layout
      .catch(e => setError(String(e)));
  };

  return (
    <div className={styles.login}>
      <Paper
        component="form"
        onSubmit={!createMode ? onLogin : onCreate}
        className={styles.loginForm}>
        <Typography variant="h2" className={styles.heading}>
          {!createMode ? 'Login' : 'Create Account'}
        </Typography>
        <TextField
          defaultValue="sjorissen94@gmail.com"
          variant="standard"
          label="Email Address"
          name="email"
          type="text"
          required
        />
        <TextField
          defaultValue="password123"
          variant="standard"
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(sp => !sp)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {createMode && (
          <>
            <TextField
              defaultValue="password123"
              variant="standard"
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(sp => !sp)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
        <Button variant="contained" type="submit">
          Submit
        </Button>
        {error && <Alert severity="error">Something bad: {error}</Alert>}
      </Paper>
      {!createMode ? (
        <div className={styles.modeSwitch}>
          <Typography variant="body1">Don't have an account?</Typography>
          <Link component="button" variant="body1" onClick={() => setCreateMode(true)}>
            Create Account
          </Link>
        </div>
      ) : (
        <div className={styles.modeSwitch}>
          <Typography variant="body1">Already have an account?</Typography>
          <Link component="button" variant="body1" onClick={() => setCreateMode(false)}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export function CreatePetForm({
  userid,
  setPet,
}: {
  userid: string;
  setPet: (p: {
    color: PetColor;
    stage: PetStage;
    species: Species;
    accessories: any[];
    name: string;
    health: number;
    status: PetStatus;
    birthday: string;
    nextUpdate: string;
  }) => void;
}) {
  const [error, setError] = useState('');

  const api = new Api({ db });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Default = GET request at current URL. We don't want that.
    event.preventDefault();
    setError('');
    const { petName } = serializeForm(event.currentTarget);
    const pet = api.randomPet(petName);
    api
      .createPet(userid, pet)
      .then(() => setPet(pet))
      .catch(e => setError(String(e)));
  };

  return (
    <div className={styles.login}>
      <Paper component="form" onSubmit={onSubmit} className={styles.loginForm}>
        <Typography variant="h2" className={styles.heading}>
          Create Pet
        </Typography>
        <TextField
          defaultValue="Billy"
          variant="standard"
          label="Pet Name"
          name="petName"
          type="text"
          helperText="Name of Pet"
          required
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
        {error && <Alert severity="error">Something bad: {error}</Alert>}
      </Paper>
    </div>
  );
}
