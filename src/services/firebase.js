import firebase from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAtQOAg5AcnjVDcxOOCcUjjMUex2GkffkU",
    authDomain: "project-3-c0409.firebaseapp.com",
    projectId: "project-3-c0409",
    storageBucket: "project-3-c0409.appspot.com",
    messagingSenderId: "263240007757",
    appId: "1:263240007757:web:e2a0a97eea49be2096dc04"
};


firebase.initializeApp(config);


// Set up a provider ... Google, FaceBook, Github
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Reference to firebase auth
const auth = firebase.auth();

// Set up auth functions
function login() {
    auth.signInWithPopup(googleProvider);
}

function logout() {
    auth.signOut();
}

// Export auth functions
export {
    login,
    logout,
    auth
}