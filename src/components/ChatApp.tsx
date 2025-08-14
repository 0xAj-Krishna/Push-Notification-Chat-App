import React, { useEffect, useState } from 'react';
import { getFCMToken } from '../utils/firebase';
import { onMessageListener } from '../utils/messaging';

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [lastSent, setLastSent] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [rateLimitMessage, setRateLimitMessage] = useState('');

  useEffect(() => {
    // Request permission and get the token
    getFCMToken().then((token) => {
      if (token) {
        setFcmToken(token);
      }
    });

    // Listen for foreground messages
    const unsubscribe = onMessageListener((payload) => {
      console.log('Foreground message received:', payload);
      
      new Notification(payload.notification?.title || 'New Message', {
        body: payload.notification?.body,
      });

      setMessages((prev) => [...prev, payload.notification?.body || 'New message']);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSendMessage = () => {
    const now = Date.now();
    if (now - lastSent > 60000) {
      setSentCount(0);
      setLastSent(now);
      setRateLimitMessage('');
    }
    if (sentCount >= 3) {
      setRateLimitMessage('Rate limit exceeded. Please wait a minute before sending another message.');
      return;
    }

    setMessages((prev) => [...prev, `You: ${message}`]);
    setSentCount((prev) => prev + 1);
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>Chat App build using Next.js, Typescipt and FCM </h1>
      <p style={{ maxWidth: '100%', wordBreak: 'break-all' }}>
        Your FCM Token:
        <br />
        <br />
        <strong style={{ wordBreak: 'break-all' }}>{fcmToken || 'Requesting token...'}</strong>
      </p>
      <p>Copy this token and paste on0 the Firebase Console for test message.</p>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          height: '300px',
          overflowY: 'scroll',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: '#888' }}>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {msg}
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={sentCount >= 3}
          style={{
            padding: '10px 20px',
            backgroundColor: sentCount >= 3 ? '#999' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: sentCount >= 3 ? 'not-allowed' : 'pointer',
          }}
        >
          Send
        </button>
      </div>
      {rateLimitMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {rateLimitMessage}
        </p>
      )}
    </div>
  );
};

export default ChatApp;