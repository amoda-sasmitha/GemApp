
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDamCq6Pc9aZ4u0m4O7n08yIXudor5OxBs",
    authDomain: "dalanlk.firebaseapp.com",
    databaseURL: "https://dalanlk.firebaseio.com",
    projectId: "dalanlk",
    storageBucket: "dalanlk.appspot.com",
    messagingSenderId: "640695683031",
    appId: "1:640695683031:web:eab544d3b9198e2b9c2d92",
    measurementId: "G-PKG3Q95RHX"
  };
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase