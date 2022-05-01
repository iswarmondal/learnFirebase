import {initializeApp} from 'firebase/app';
import {
  getFirestore, collection, getDocs,
  addDoc, doc, deleteDoc
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

  // Add new entry
  const addForm = document.querySelector(".add")

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
      title: addForm.title.value,
      author: addForm.author.value
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