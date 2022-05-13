import {initializeApp} from 'firebase/app';
import {
  getFirestore, collection, onSnapshot,
  addDoc, doc, deleteDoc,
  query, where, serverTimestamp, orderBy, updateDoc
} from 'firebase/firestore'

import {
  getAuth, createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBliJvMoxcBdXHseEqlNlnXnXhmI-pOhxI",
    authDomain: "learn-firebase-65b3b.firebaseapp.com",
    databaseURL: "https://learn-firebase-65b3b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-firebase-65b3b",
    storageBucket: "learn-firebase-65b3b.appspot.com",
    messagingSenderId: "573802573674",
    appId: "1:573802573674:web:c27d4f37170361f0793f13"
  };

  initializeApp(firebaseConfig)

  // Get the connection to the db
  const db = getFirestore()

  // Get the collection referance
  const colRef = collection(db, 'books')

  // FireStore query
  const q = query(colRef, orderBy("createdAt"));

  // Get all the documents in that collection
    onSnapshot(q, (snapshot)=>{
      let books = [];
      snapshot.docs.forEach((doc)=>{
        books.push({ id: doc.id, ...doc.data() })
      })
      console.log(books);
    })

  // Add new entry
  const addForm = document.querySelector(".add")

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addForm.title.value,
      author: addForm.author.value,
      createdAt: serverTimestamp(),
    })
      .then(() => addForm.reset())
  })

  // Delete documents
  const deleteFrom = document.querySelector(".delete");
  deleteFrom.addEventListener("submit", (e)=>{
    e.preventDefault();

    const docRef = doc(db, "books", deleteFrom.id.value);

    deleteDoc(docRef)
      .then(()=>{
        deleteFrom.reset();
      })
  })

  // Update documents
  const updateFrom = document.querySelector(".update");
  updateFrom.addEventListener("submit", (e)=>{
    e.preventDefault();

    const docRef = doc(db, "books", updateFrom.id.value);

    updateDoc(docRef, {
      author: updateFrom.author.value
    })
      .then(()=> updateFrom.reset())
  })

// Setup firebase auth
const auth = getAuth();

// Signup form
const signup = document.querySelector("#signup");
signup.addEventListener('submit', (e)=>{
  e.preventDefault();

  const email = signup.email.value;
  const pass = signup.pass.value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then((credential)=>{
      console.log(`New user credentials are ${credential}`);
      signup.reset();
    })
    .catch((err)=>{
      console.log(err.message);
    })
})

// logging out
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e)=>{
  e.preventDefault();

  signOut(auth)
    .then(()=>{
      console.log(`User logged out`);
    })
    .catch((err)=>{
      console.log(err.message);
    })
})

// Login user
const login = document.querySelector("#login");
login.addEventListener('submit', (e)=>{
  e.preventDefault();

  const email = login.email.value;
  const pass = login.pass.value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(cred=>{
      console.log(cred.user);
      login.reset();
    })
    .catch((err)=>{
      console.log(err.message);
    })
})