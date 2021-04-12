import { FastifyPluginCallback, RouteShorthandOptions } from 'fastify';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ILoginBody, loginSchema } from './auth.schema';

import User from '@entity/User.entity';
import UserProfile from '@entity/UserProfile.entity';

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

      const user = await userRepository.findOne({
        user_id: req.body.id,
      });

      if (!user) {
        return res.status(400).send({ message: "User doesn't exists" });
      }

      // Compare encrypted password and requested password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).send({ message: 'Password incorrect' });
      }

      const userProfile = await userProfileRepository.findOne({
        fk_user_id: user.id,
      });
      const token = await user.generateToken();
      const { accessToken, refreshToken } = token;
      if (!accessToken || !refreshToken) {
        return res.status(500).send({ message: 'Something went wrong' });
      }

      const { tag, short_bio } = userProfile!;

      // Pass refresh_token to user cookie
      res.setCookie('token', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
      });

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

export default loginRoute;
