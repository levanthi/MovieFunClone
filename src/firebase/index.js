// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: 'AIzaSyBpNMLoYNXBLvy50DNaLahr6nkFi8lMyPM',
   authDomain: 'moviefun-3706e.firebaseapp.com',
   projectId: 'moviefun-3706e',
   storageBucket: 'moviefun-3706e.appspot.com',
   messagingSenderId: '1060979616060',
   appId: '1:1060979616060:web:29e5caa9c2de10bb8dd639',
   measurementId: 'G-N3MJLLKLEM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
