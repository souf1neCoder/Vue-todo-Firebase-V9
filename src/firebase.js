import { initializeApp } from "firebase/app";
// 
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// add your configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

initializeApp(firebaseConfig);

import {getFirestore,collection} from "firebase/firestore";
const db = getFirestore();
export  default db;
export const colRef = collection(db,"tasks");
export const auth  = getAuth();