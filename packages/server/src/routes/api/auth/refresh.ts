import AuthToken from '../../../entities/AuthToken.entity';
import { FastifyPluginCallback } from 'fastify';
import { getRepository } from 'typeorm';
import User from '../../../entities/User.entity';
import JWT from '../../../lib/jwt';

interface IUserTokenCookie {
  id: string;
  token: string;
}

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
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

export default refreshRoute;
