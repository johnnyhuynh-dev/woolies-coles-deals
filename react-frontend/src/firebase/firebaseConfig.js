import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0Pr9WpOut5N31uy18kbhH6kx2KFl4oC0",
  authDomain: "woolies-coles-deals-18609.firebaseapp.com",
  databaseURL: "https://woolies-coles-deals-18609.firebaseio.com",
  projectId: "woolies-coles-deals-18609",
  storageBucket: "woolies-coles-deals-18609.appspot.com",
  messagingSenderId: "708850250537",
  appId: "1:708850250537:web:b0e670fef4123902b73d38",
  measurementId: "G-N5RHDMD92S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Project Firestore
const projectFirestore = firebase.firestore();

export { projectFirestore };
