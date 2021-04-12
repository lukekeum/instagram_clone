import { FastifyPluginCallback } from 'fastify';
import { getRepository } from 'typeorm';
import { IRegisterBody, registerSchema } from './auth.schema';
import bcrypt from 'bcrypt';

import User from '@entity/User.entity';
import UserProfile from '@entity/UserProfile.entity';

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

export default registerRoute;
