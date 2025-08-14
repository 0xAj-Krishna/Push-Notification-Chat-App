import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyChM-mMXFCi3xWMOc6Q7q9rbnlSYUt6ApM",
  authDomain: "project-chatbox-be70a.firebaseapp.com",
  projectId: "project-chatbox-be70a",
  storageBucket: "project-chatbox-be70a.firebasestorage.app",
  messagingSenderId: "103965665517",
  appId: "1:103965665517:web:475b1192e2cef86e9844e4",
  measurementId: "G-4HCDPW8G9C"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

//FCM token funtion
export const getFCMToken = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const messaging = getMessaging(app);

      let permission = Notification.permission;
      if (permission !== 'granted') {
        permission = await Notification.requestPermission();
      }

      if (permission === 'granted') {
        const currentToken = await getToken(messaging, {
          // Replace this with your actual VAPID key
          vapidKey: 'BPU7oRygsuK9FbNc9R9IvAt3ijb-6f5Cd_7H6taw4t4hJ3OtXvCVrhaZJ6DZVitM00mIK0mxp6G61T3dGOKgb1c',
        });
        if (currentToken) {
          console.log('FCM registration token:', currentToken);
          return currentToken;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return undefined;
        }
      } else {
        console.log('Notification permission was denied.');
        return undefined;
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
      return undefined;
    }
  }
  return undefined;
};

export const getFirebaseMessaging = () => {
    return getMessaging(app);
}