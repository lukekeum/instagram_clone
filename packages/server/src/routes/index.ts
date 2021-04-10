import { FastifyPluginCallback } from 'fastify';
import authRoute from './api/auth';

const rootRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(authRoute, { prefix: '/api/auth' });
};

export default rootRoute;
