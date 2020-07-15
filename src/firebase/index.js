import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore';

import { store } from '../redux/store';
import { firebaseConfig } from './config';

/* Добавте свой firebaseConfig в initializeApp ниже*/
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
