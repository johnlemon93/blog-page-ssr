// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyB0CIlCISQJxYGCjVfgpLbLnxKjuzn9Rtk",
    authDomain: "blog-chanh-day.firebaseapp.com",
    databaseURL: "https://blog-chanh-day.firebaseio.com",
    projectId: "blog-chanh-day",
    storageBucket: "blog-chanh-day.appspot.com",
    messagingSenderId: "344695729502"
  };

var app = firebase.initializeApp(config);

function createGoogleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
}

const fire = {
    app,
    createGoogleAuthProvider
};

export default fire;