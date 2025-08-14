import { link } from "fs";

importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
  // Replace these with your actual Firebase project settings
  apiKey: "AIzaSyChM-mMXFCi3xWMOc6Q7q9rbnlSYUt6ApM",
  authDomain: "project-chatbox-be70a.firebaseapp.com",
  projectId: "project-chatbox-be70a",
  storageBucket: "project-chatbox-be70a.firebasestorage.app",
  messagingSenderId: "103965665517",
  appId: "1:103965665517:web:475b1192e2cef86e9844e4",
  measurementId: "G-4HCDPW8G9C"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});