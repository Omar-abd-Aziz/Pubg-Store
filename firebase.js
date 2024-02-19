export const firebaseConfig = {
  apiKey: "AIzaSyCxhFz0o6GZZr0xLC4qBbrDNRJWv2Wi0bI",
  authDomain: "ordersystem-f3088.firebaseapp.com",
  projectId: "ordersystem-f3088",
  storageBucket: "ordersystem-f3088.appspot.com",
  messagingSenderId: "676460912839",
  appId: "1:676460912839:web:a6e88519d4f45fc8055ee2",
  measurementId: "G-6R5MHRT3XJ"
};


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, updateDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';


let docName = "pubg-store-doc-id";

export {docName,initializeApp,getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, updateDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt};

