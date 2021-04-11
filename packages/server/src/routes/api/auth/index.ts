import { FastifyPluginCallback } from 'fastify';
import loginRoute from './login';
import refreshRoute from './refresh';
import registerRoute from './register';

const authRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(loginRoute, { prefix: '/login' });
  fastify.register(registerRoute, { prefix: '/register' });
  fastify.register(refreshRoute, { prefix: '/refresh' });
};

export default authRoute;
