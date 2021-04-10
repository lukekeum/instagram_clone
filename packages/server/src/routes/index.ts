import { FastifyPluginCallback } from 'fastify';

const rootRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get('/', async (req, res) => {
    return { hello: 'world' };
  });
};

export default rootRoute;
