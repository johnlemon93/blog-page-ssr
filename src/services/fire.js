// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    databaseURL: "your database url",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaing sender id"
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
