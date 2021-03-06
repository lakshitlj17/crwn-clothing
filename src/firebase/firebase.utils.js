import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDA9fzuTOiMMtlMuaKIXwvAYevterbVlt4",
    authDomain: "crwn-db-75d80.firebaseapp.com",
    databaseURL: 'https://crwn-clothing-db.firestore.com',
    projectId: "crwn-db-75d80",
    storageBucket: "crwn-db-75d80.appspot.com",
    messagingSenderId: "866638145765",
    appId: "1:866638145765:web:d15f0b7cbd50bede668c0c",
    measurementId: "G-2QYGZ81QMF"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if(!snapShot.exists) {
       const { displayName, email } = userAuth;
       const createdAt = new Date();

       try {
           await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData
           })
       } catch (error) {
             console.log('error creating user', error.message);
       }
   }

   return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;