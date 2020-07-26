import admin from 'firebase-admin';
import serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activity-tracker-d9d56.firebaseio.com"
});
