import { FastifyPluginCallback } from 'fastify';
import findUserRoute from './findUser';

const userRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(findUserRoute, { prefix: '/found' });
};

export default userRoute;
