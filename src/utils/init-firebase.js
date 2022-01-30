import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore,enableIndexedDbPersistence  } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgskSPZaF0BvTm3qdQ0QjnMtmPjn4uYlA",
  authDomain: "assessment-57d7a.firebaseapp.com",
  databaseURL: "https://assessment-57d7a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assessment-57d7a",
  storageBucket: "assessment-57d7a.appspot.com",
  messagingSenderId: "301143731904",
  appId: "1:301143731904:web:bd7b4143904259aa650725"
};

const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.

    console.log("You have Violated The law only use 1 Tab")
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    console.log("Browser does not support IndexedDB")
  }
});


export const auth = getAuth(app);
export {db}