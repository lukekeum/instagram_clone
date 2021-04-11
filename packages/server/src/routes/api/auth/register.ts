import User from '../../../entities/User.entity';
import UserProfile from '../../../entities/UserProfile.entity';
import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

interface IRegisterBody {
  id: string;
  password: string;
  email: string;
  tag: string;
}

const registerRoute: FastifyPluginCallback = async (fastify, opts) => {
  /**
   * POST /api/auth/register
   * Register user account with id and password
   */
  fastify.post<{ Body: IRegisterBody }>(
    '/',
    registerSchema,
    async (req, res) => {
      try {
        const userRepository = await getRepository(User);
        const userProfileRepository = await getRepository(UserProfile);

        const { id, password, email, tag } = req.body;

        const idUserExists = await userRepository.findOne({
          where: [{ user_id: id }, { email }],
        });
        const tagUserExists = await userProfileRepository.findOne({
          tag,
        });

        if (idUserExists) {
          return res
            .status(400)
            .send({ message: 'ID or Email user already exists' });
        }

        if (tagUserExists) {
          return res.status(400).send({ message: 'Tag user already exists' });
        }

        // Encrypt password with bcrypt Library
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = new User();
        user.user_id = id;
        user.email = email;
        user.password = encryptedPassword;
        await userRepository.save(user);

        const userProfile = new UserProfile();
        userProfile.fk_user_id = user.id;
        userProfile.tag = tag;
        await userProfileRepository.save(userProfile);

        const data = {
          id: user.id,
          user_id: id,
          email,
          profile: {
            tag,
            short_bio: userProfile.short_bio,
          },
        };

        return res.status(201).send({
          message: 'Successfully registered',
          data,
        });
      } catch (err) {
        fastify.log.error(err);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  );
};

const registerSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'password', 'email', 'tag'],
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        tag: { type: 'string' },
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

export default registerRoute;
