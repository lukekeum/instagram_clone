import { FastifyPluginCallback } from 'fastify';
import loginRoute from './login';
import registerRoute from './register';

const authRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(loginRoute, { prefix: '/login' });
  fastify.register(registerRoute, { prefix: '/register' });
};

export default authRoute;
