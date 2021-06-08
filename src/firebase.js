/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/firestore';
import { API_KEY } from './constants';

export const firebaseConfig = firebase.initializeApp({
  API_KEY,
  authDomain: 'todoist-6ce26.firebaseapp.com',
  databaseURL:
    'https://todoist-6ce26-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todoist-6ce26',
  storageBucket: 'todoist-6ce26.appspot.com',
  messagingSenderId: '139186077814',
  appId: '1:139186077814:web:15accd2031a37b98095f57',
  measurementId: 'G-WPXJ5P8N67',
});

export { firebaseConfig as firebase };
