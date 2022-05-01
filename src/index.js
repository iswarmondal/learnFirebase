import {initializeApp} from 'firebase/app';
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

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

  // Get all the documents in that collection
  getDocs(colRef)
    .then((snapshot)=>{
      let books = [];
      snapshot.docs.forEach((doc)=>{
        books.push({ id: doc.id, ...doc.data() })
      })
      console.log(books);
    }).catch(err => {
      throw err;
    })