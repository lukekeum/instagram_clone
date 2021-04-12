import { FastifyPluginCallback } from 'fastify';
import findByEmail from './found/byEmail';
import findByUserID from './found/byUserID';
import findByUUID from './found/byUUID';

const findUserRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(findByUUID, { prefix: '/by-uuid' });
  fastify.register(findByUserID, { prefix: '/by-userid' });
  fastify.register(findByEmail, { prefix: '/by-email' });
};

export default findUserRoute;
