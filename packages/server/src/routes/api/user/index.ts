import { FastifyPluginCallback } from 'fastify';
import findUserRoute from './findUser';
import searchUserRoute from './searchUser';

const userRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(findUserRoute, { prefix: '/found' });
  fastify.register(searchUserRoute, { prefix: '/search' });
};

export default userRoute;
