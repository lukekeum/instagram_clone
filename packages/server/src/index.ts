import 'reflect-metadata';
import './env';

import Server from './server';

const server = new Server();

server.listen();
