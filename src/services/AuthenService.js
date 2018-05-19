import firebase from './fire';

let auth = firebase.app.auth();
let ggProvider = firebase.createGoogleAuthProvider();

let listeners = {};
let currentUser = null;

const AuthState = {
    Unknown: 'U',
    Ok: 'Y',
    No: 'N'
}
let authState = AuthState.Unknown;

let unregisterAuthObserver = auth.onAuthStateChanged(user => {
    currentUser = user;
    authState = currentUser == null ? AuthState.No : AuthState.Ok;
    broadcast();
});

function broadcast() {
    Object.keys(listeners).forEach(k => {
        listeners[k](authState, currentUser);
    });
}

function login() {

}

function loginWithGoogle() {
    auth.signInWithPopup(ggProvider)
        .then(function (result) {
        }).catch(function (err) {
        });
}

function onAuthStateChanged(key, cb) {
    listeners[key] = cb;
    cb(authState, currentUser);
    return () => unregister(key);
}

function unregister(key) {
    delete listeners[key];
    if (Object.keys(listeners).length === 0) {
        unregisterAuthObserver();
    }
}

export default {
    login,
    loginWithGoogle,
    onAuthStateChanged,
    AuthState
}