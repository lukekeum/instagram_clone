import User from '@src/entities/User.entity';
import { FastifyPluginCallback } from 'fastify';
import { getRepository, Like } from 'typeorm';

const searchUserRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get<{ Body: { input: string } }>(
    '/',
    searchUserSchema,
    async (req, res) => {
      try {
        const { input } = req.body;
        if (!input) return res.status(400).send({ message: 'Unknown input' });

        const userRepository = await getRepository(User);

        const SearchUser = await userRepository.find({
          where: {
            email: Like(input),
            user_id: Like(input),
          },
        });

        if (SearchUser.length < 1) {
          res.status(404).send({ message: 'No user found' });
        }

        res.status(200).send({ data: SearchUser });
      } catch (err) {
        fastify.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};

const searchUserSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['input'],
      properties: {
        input: { type: 'string' },
      },
    },
    response: {
      '4xx': {
        'type': 'object',
        'properties': {
          message: { type: 'string' },
        },
        '5xx': {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
};

export default searchUserRoute;
