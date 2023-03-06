// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsIdgFQeFnpxlk0PsCDaqfqhQvIxMrdHo',
  authDomain: 'firstproject-79bbe.firebaseapp.com',
  databaseURL:
    'https://firstproject-79bbe-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'firstproject-79bbe',
  storageBucket: 'firstproject-79bbe.appspot.com',
  messagingSenderId: '848481997037',
  appId: '1:848481997037:web:b9eed2a958da793bbcfce4',
  measurementId: 'G-4QQLT1XJKF',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp)
export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp)
