import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiBFPy1BqNjS_RStD0OjSamrJwp5iq1x4",
  authDomain: "new-chatapp-d564e.firebaseapp.com",
  projectId: "new-chatapp-d564e",
  storageBucket: "new-chatapp-d564e.appspot.com",
  messagingSenderId: "867185183317",
  appId: "1:867185183317:web:23bd6819b3ca413b5322dc",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
