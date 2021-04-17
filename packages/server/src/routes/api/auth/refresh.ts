import { FastifyPluginCallback } from 'fastify';
import { getRepository } from 'typeorm';

import AuthToken from '@entity/AuthToken.entity';
import User from '@entity/User.entity';
import JWT from '@lib/jwt';
import UserProfile from '@src/entities/UserProfile.entity';

const refreshRoute: FastifyPluginCallback = async (fastify, opts) => {
  /**
   * PATCH /api/auth/refresh
   * Re-generate user token
   */
  fastify.patch('/', async (req, res) => {
    try {
      const token_id = req.cookies['token'];

      const tokenRepository = await getRepository(AuthToken);
      const userRepository = await getRepository(User);

      const token = JWT.decode(token_id);
      const tokenEntity = await tokenRepository.findOne();

      if (!tokenEntity || token) {
        return res.status(401).send({ message: 'Invalid token' });
      }

      tokenEntity.expired = true;

      const user = await userRepository.findOne(tokenEntity.fk_user_id);
      const userProfile = await getRepository(UserProfile).findOne({
        fk_user_id: user?.id,
      });
      const tokens = await user?.generateToken();

      await tokenRepository.save(tokenEntity);

      res.setCookie('token', tokens?.refreshToken!, {
        path: '/',
        httpOnly: true,
        secure: true,
      });

      return res.status(201).send({
        message: 'Successfully regenerated',
        token: tokens?.accessToken!,
        data: {
          id: user?.id,
          user_id: user?.user_id,
          email: user?.email,
          profile: {
            tag: userProfile?.tag,
            short_bio: userProfile?.short_bio,
          },
        },
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

export default refreshRoute;
