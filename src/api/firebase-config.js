import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-8GS42EIJjfwMCe24u2l1f9WMrFJVPeA',
  authDomain: 'fur-minder.firebaseapp.com',
  databaseURL: 'https://fur-minder-default-rtdb.firebaseio.com',
  projectId: 'fur-minder',
  storageBucket: 'fur-minder.appspot.com',
  messagingSenderId: '968263587216',
  appId: '1:968263587216:web:d26abc464f6ee184e5cf15',
  measurementId: 'G-BWW8SZDSNK',
};

const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const auth = getAuth(app);
if (window.location.hostname === 'localhost') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, 'localhost', 9000);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export default database;
