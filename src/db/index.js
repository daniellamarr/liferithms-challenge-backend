import mongo from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {NODE_ENV, DB_DEV, DB_PROD} = process.env;

let url = '';

switch (NODE_ENV) {
  case 'development':
    url = DB_DEV;
    break;
  case 'production':
    url = DB_PROD;
    break;
  default:
    url = `mongodb://localhost:27017/${DB_DEV}`;
    break;
}

mongo.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongo.connection;
db.once('open', () => {
  console.log('Database Connected!')
});

db.on('error', () => {
  console.log('Failed to connect to DB!')
})
