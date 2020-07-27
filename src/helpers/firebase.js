import admin from 'firebase-admin';
import serviceAccount from '/app/google-credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activity-tracker-d9d56.firebaseio.com"
});
