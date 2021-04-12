import User from '@src/entities/User.entity';
import UserProfile from '@src/entities/UserProfile.entity';
import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';

const findByUserID: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get<{ Headers: { userid: string } }>(
    '/',
    byUserIDSchema,
    async (req, res) => {
      try {
        const userid = req.headers['userid'];

        if (!userid) {
          return res.status(400).send({ message: 'USERID not found' });
        }

        const user = await getRepository(User).findOne({ user_id: userid });

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

const byUserIDSchema: RouteShorthandOptions = {
  schema: {
    headers: {
      type: 'object',
      required: ['userid'],
      properties: {
        userid: { type: 'string' },
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

export default findByUserID;
