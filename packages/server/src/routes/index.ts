import { FastifyPluginCallback } from 'fastify';
import authRoute from './api/auth';
import userRoute from './api/user';

const rootRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(authRoute, { prefix: '/api/auth' });
  fastify.register(userRoute, { prefix: '/api/user' });
};

export default rootRoute;
