import express from 'express';
import cors from 'cors';
import './db';

const server = express();

server.use(cors());

const port = process.env.PORT || 2900;

server.listen(port, () => console.log('listening on port ' + port));

export default server;
