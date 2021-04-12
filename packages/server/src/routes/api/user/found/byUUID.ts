import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';
import User from '@entity/User.entity';
import UserProfile from '@entity/UserProfile.entity';

const findByUUID: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get<{ Headers: { uuid: string } }>(
    '/',
    byUUIDSchema,
    async (req, res) => {
      try {
        const uuid = req.headers['uuid'];

        if (!uuid) {
          return res.status(400).send({ message: 'UUID not found' });
        }

        const user = await getRepository(User).findOne(uuid);

        if (!user) {
          return res.status(400).send({ message: 'Unknwon User' });
        }

        const userProfile = await getRepository(UserProfile).findOne({
          fk_user_id: user.id,
        });

        const data = {
          id: user.id,
          user_id: user.user_id,
          email: user.email,
          profiles: {
            tag: userProfile?.tag,
            short_bio: userProfile?.short_bio,
          },
        };

        return res.status(200).send({
          data,
        });
      } catch (err) {
        fastify.log.error(err);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};

const byUUIDSchema: RouteShorthandOptions = {
  schema: {
    headers: {
      type: 'object',
      required: ['uuid'],
      properties: {
        uuid: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            id: { type: 'string' },
            email: { type: 'string' },
            profile: {
              tag: { type: 'string' },
              short_bio: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

export default findByUUID;
