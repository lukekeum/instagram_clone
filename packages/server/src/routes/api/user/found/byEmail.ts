import User from '@src/entities/User.entity';
import UserProfile from '@src/entities/UserProfile.entity';
import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';

const findByEmail: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get<{ Headers: { email: string } }>('/', async (req, res) => {
    try {
      const email = req.headers['email'];

      if (!email) {
        return res.status(400).send({ message: 'Email not found' });
      }

      const user = await getRepository(User).findOne({ email });

      if (!user) {
        return res.status(400).send({ message: 'Unknown User' });
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

      return res.status(200).send({ data });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

const byEmailSchema: RouteShorthandOptions = {
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

export default findByEmail;
