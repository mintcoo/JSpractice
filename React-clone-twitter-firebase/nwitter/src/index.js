import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import firebase from "firebase/compat/app";
import app from './firebase'
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

// console.log(firebase);
console.log(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

