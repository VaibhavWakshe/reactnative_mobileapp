import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config object here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();