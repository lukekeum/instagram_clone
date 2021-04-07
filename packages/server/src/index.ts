import 'reflect-metadata';
import './env';

import Server from './server';
import Database from './database';

const database = new Database();
const server = new Server();
const app = server.server;

database
  .connect()
  .then(() => {
    app.log.info(`Database connected with ${process.env.TYPEORM_TYPE}`);
    server.listen();
  })
  .catch((err) => console.error(err));
