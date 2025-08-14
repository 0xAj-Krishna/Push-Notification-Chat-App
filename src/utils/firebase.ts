import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  appId: "YOUR_MESSAGING_SENDER_ID",
  messagingSenderId: "YOUR_APP_ID",
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
          vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
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