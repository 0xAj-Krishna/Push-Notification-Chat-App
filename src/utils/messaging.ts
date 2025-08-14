import { getFirebaseMessaging } from './firebase';
import { onMessage } from 'firebase/messaging';

// Listener for foreground messages
export const onMessageListener = (callback: (payload: any) => void) => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const messaging = getFirebaseMessaging();
    return onMessage(messaging, callback);
  }
  
  return () => {};
};