// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig={
    apiKey: "AIzaSyBliJvMoxcBdXHseEqlNlnXnXhmI-pOhxI",
    authDomain: "learn-firebase-65b3b.firebaseapp.com",
    projectId: "learn-firebase-65b3b",
    storageBucket: "learn-firebase-65b3b.appspot.com",
    messagingSenderId: "573802573674",
    appId: "1:573802573674:web:ecf3b8929d3bf22a793f13"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

// Detect the auth state
onAuthStateChanged(auth,user =>{
    if(user != null){
        console.log("User logedin")
    } else{
        console.log("Please login");
    }
})