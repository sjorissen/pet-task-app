import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Api from '../api/api';
import db, { auth } from '../api/firebase-config';
import { PetType } from '../api/models';
import { logo } from '../logo/logoMan.png';
import styles from './Layout.module.scss';
import { LoginForm, CreatePetForm } from './UserAuth';
type PetCtx = [PetType | undefined, (p: PetType) => void];
const PetContext = React.createContext([undefined, () => {}] as PetCtx);
export const usePet = () => React.useContext(PetContext);

export default function Layout({ children }: { children: ReactNode }): ReactElement {
  const [authInitialized, setAuthInitialized] = useState(false);
  const [userId, setUserId] = useState('');
  const [pet, setPet] = useState<PetType | undefined>();

  const api = new Api({ db });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // if we are in the middle of creating a user,
      // we don't consider auth to be initialized yet.
      if (user?.uid) {
        api
          .getPet(user.uid)
          .then(p => {
            setPet(p);
            setUserId(user.uid);
            setAuthInitialized(true);
          })
          .catch(() => {
            setUserId(user.uid);
            setAuthInitialized(true);
          });
      } else {
        setAuthInitialized(true);
        setPet(undefined);
        setUserId('');
      }
    });
  }, []);

  return (
    <PetContext.Provider value={[pet, setPet]}>
      <Box className={styles.app}>
        <AppBar position="static" className={styles.navbar}>
          <Toolbar>
            {/*<img src={logo} alt="Furryminder Mascot" id="logoMan"></img>*/}
            <Typography id="furryMinder" variant="h6" component="div">
              <h2>Furry-Minder</h2>
            </Typography>
            {userId ? (
              <Button color="inherit" onClick={() => signOut(auth)}>
                Logout
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
        <main className={styles.main}>
          {authInitialized || 'loading...'}
          {authInitialized && !userId && <LoginForm />}
          {userId && !pet && <CreatePetForm userid={userId} setPet={setPet} />}
          {userId && !!pet && children}
        </main>
      </Box>
    </PetContext.Provider>
  );
}
