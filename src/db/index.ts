// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyCYBJ5guKUaWSLkvyDWRoqfSG7YXM2iDVE',
  authDomain: 'warehouse-birds-buils.firebaseapp.com',
  projectId: 'warehouse-birds-buils',
  storageBucket: 'warehouse-birds-buils.appspot.com',
  messagingSenderId: '336998531034',
  appId: '1:336998531034:web:0df5f3a8250c89382f0ae3',
  databaseURL:
    'https://warehouse-birds-buils-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
//initializeApp(firebaseConfig);

// запись данных
// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, "users/" + userId), {
//     username: name,
//     email: email,
//     profile_picture: imageUrl,
//   });
// }
// writeUserData("214141", "John", "sdvsdv@sfvsf.com", "dskksksksksk");
// получение данных
// const dbRef = ref(getDatabase());
// const userId = 214141;
// get(child(dbRef, `users/${userId}`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });