import User from '@src/entities/User.entity';
import UserProfile from '@src/entities/UserProfile.entity';
import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository, Like } from 'typeorm';

interface IUserData {
  id: string;
  user_id: string;
  email: string;
  profiles: {
    tag: string;
    short_bio: string | null;
  };
}

const searchUserRoute: FastifyPluginCallback = async (fastify, opts) => {
  fastify.get<{ Querystring: { search: string } }>(
    '/',
    searchUserSchema,
    async (req, res) => {
      try {
        const { search } = req.query;
        if (!search) return res.status(400).send({ message: 'Unknown input' });

        const userRepository = await getRepository(User);

        const SearchUser = await userRepository.find({
          where: [
            { user_id: Like(`${search}%`) },
            { email: Like(`${search}%`) },
          ],
        });

        if (SearchUser.length < 1) {
          res.status(200).send({ message: 'No user found' });
        }

        const data: IUserData[] = [];

        for (const user of SearchUser) {
          const userProfile = await getRepository(UserProfile).findOne({
            fk_user_id: user.id,
          });

          const userdata: IUserData = {
            id: user.id,
            user_id: user.user_id,
            email: user.email,
            profiles: {
              tag: userProfile!.tag,
              short_bio: userProfile!.short_bio,
            },
          };

          data.push(userdata);
        }

        res.status(200).send({ data });
      } catch (err) {
        fastify.log.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};

const searchUserSchema = {
  schema: {
    querystring: {
      search: { type: 'string' },
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
