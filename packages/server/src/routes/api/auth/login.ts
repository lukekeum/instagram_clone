import User from '../../../entities/User.entity';
import UserProfile from '../../../entities/UserProfile.entity';
import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';

interface ILoginBody {
  id: string;
  password: string;
}

const loginRoute: FastifyPluginCallback = async (fastify, opts) => {
  /**
   * POST /api/auth/login
   * Login into user account with id and password
   */
  fastify.post<{ Body: ILoginBody }>('/', loginSchema, async (req, res) => {
    try {
      const userRepository = await getRepository(User);
      const userProfileRepository = await getRepository(UserProfile);

      const { id, password } = req.body;

      fastify.log.debug(2);
      const user = await userRepository.findOne({
        user_id: req.body.id,
      });

      fastify.log.debug(1);

      if (!user) {
        return res.status(400).send({ message: "User doesn't exists" });
      }

      // TODO: Compare encrypted password and requested password

      const userProfile = await userProfileRepository.findOne({
        fk_user_id: user.id,
      });
      const token = await user.generateToken();

      const { tag, short_bio } = userProfile!;

      // TODO: Pass refresh_token to user cookie

      const data = {
        id: user.id,
        user_id: id,
        email: user.email,
        profile: {
          tag,
          short_bio,
        },
      };

      return res.status(201).send({
        message: 'Successfully logined',
        data,
        token: token.accessToken,
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

const loginSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'password'],
      properties: {
        id: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            email: { type: 'string' },
            profile: {
              tag: { type: 'string' },
              short_bio: { type: 'string' },
            },
          },
          token: { type: 'string' },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

export default loginRoute;
