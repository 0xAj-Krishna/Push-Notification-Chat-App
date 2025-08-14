![Next.js](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8w1hhq2um83lqlc5f0pp.jpg)
# Next.js FCM Chat App
This project is a simple chat application built with Next.js, TypeScript, and Firebase Cloud Messaging (FCM) to handle push notifications. It demonstrates how to request notification permissions, get a unique FCM token for a device, and receive push notifications from the Firebase Console.

### ⚙️ Prerequisites
Before you get started, make sure you have the following installed on your machine:

- Node.js and npm (or Yarn/pnpm)

- A Firebase project configured for web applications.

### 🚀 Setup Instructions
#### Clone the repository:

```bash
git clone [your_repository_url]
cd [your_repository_name]
```
#### Install project dependencies:

```bash
npm install
```

#### Start the development server:

```bash
npm run dev
```
The application will be available at http://localhost:3000.

### 🔥 Firebase Setup Guide
#### To enable push notifications, you need to link this project with your Firebase account.

#### 1. Create a Firebase Project:

- Go to the Firebase Console.

- Click Add project and follow the on-screen instructions.

#### 2. Register a Web App:

- In your Firebase project, navigate to Project settings.

- Under the Your apps section, click the Web icon (</>) to add a new web app.

- Give your app a nickname and click Register app.

- Copy the Firebase SDK configuration object.

#### 3. Update Your Code with Firebase Config:

- Open src/utils/firebase.ts and public/firebase-messaging-sw.js.

- Paste the Firebase SDK configuration you copied into the firebaseConfig object in both files.

#### 4. Get Your VAPID Key:

- In the Firebase Console, go to Project settings > Cloud Messaging.

- Under Web configuration, click on Generate key pair.

- Copy the generated key.

#### Update Your Code with the VAPID Key:

- Open src/utils/firebase.ts.

- Paste your VAPID key as the value for vapidKey.

- #### Note: The VAPID key is a security credential. Keep it private and do not share it publicly.

### ✅ How to Test Notifications
#### 1. Get the FCM Token:

- Run the application and open it in a modern browser (like Chrome or Firefox).

- The app will prompt you for notification permissions. Allow them.

- The FCM registration token will be displayed on the page. Copy this token.

#### 2. Send a Test Message from the Firebase Console:

- In your Firebase Console, navigate to Engage > Cloud Messaging.

- Click the Send your first message button.

- Enter a Notification title and Notification text.

- On the right side, click Send test message.

- In the pop-up, paste the FCM token you copied from your app into the Add an FCM registration token field.

- Click Test.

#### 3. The notification should appear in your browser, and the message will be logged to the in-app chat display.
