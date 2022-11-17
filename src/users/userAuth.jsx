import { Alert, Input, InputLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { getValue } from '@testing-library/user-event/dist/utils';
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { ref, set } from 'firebase/database';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';
import { useState } from 'react';
import database from '../api/firebase-config';

// async function addUser(email, password) {
//   return set(ref(database, 'users/' + email), {
//     password: password,
//   });
// }

function userAuth(email, password) {
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

export default function LoginForm() {
  const [error, setError] = useState(null);
  const onSubmit = event => {
    // Default = GET request at current URL. We don't want that.
    event.preventDefault();
    setError(null);
    // Takes form entries and serializes to an object. { key: "value" }
    const { email, password } = Object.fromEntries(new FormData(event.target));
    console.log({ email, password });
    // addUser(email, password).catch(e => {
    //   console.error(e);
    //   setError(String(e));
    // });
    userAuth(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <Alert severity="error">Something bad: {error}</Alert>}
      <InputLabel htmlFor="email">Email address</InputLabel>
      <Input name="email" aria-describedby="Email" /> <br />
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input name="password" aria-describedby="Password" />
      <Button variant="submit" type="submit" class="class-name">
        Submit
      </Button>
    </form>
  );
}
