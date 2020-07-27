import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './helpers/firebase';
import './db';
import router from './routes';

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', router);

const port = process.env.PORT || 2900;

server.listen(port, () => console.log('listening on port ' + port));

export default server;
