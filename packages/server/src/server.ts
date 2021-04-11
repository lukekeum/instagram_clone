import fastify, { FastifyInstance } from 'fastify';

import fastifyCompress from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import rootRoute from './routes';

class Server {
  private _server: FastifyInstance;
  constructor() {
    this._server = fastify({ logger: true });

    this._server.register(fastifyCompress);
    this._server.register(fastifyCookie);

    this._server.register(rootRoute, { prefix: '/' });
  }

  public listen(): Promise<string> {
    const { PORT } = process.env;

    if (!PORT) throw new Error('Port not found');

    return new Promise((res, rej) => {
      this._server
        .listen(PORT, '0.0.0.0')
        .then((value) => {
          res(value);
        })
        .catch((err) => {
          this._server.log.error(err);
          rej(err);
        });
    });
  }

  get server(): FastifyInstance {
    return this._server;
  }
}

export default Server;
