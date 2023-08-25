import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyDY6ej-h_wKHHaaOGAM83EG4AcibSKyVjE",
         authDomain: "chatapp-fb201.firebaseapp.com",
         projectId: "chatapp-fb201",
         storageBucket: "chatapp-fb201.appspot.com",
         messagingSenderId: "234975494932",
         appId: "1:234975494932:web:805fe6d9173aa6a4de3801"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
