import jwt from 'jsonwebtoken';

class JWT {
  public static secret() {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('There are no JWT_SECRET inside env file!');
    }

    return JWT_SECRET;
  }

  public static sign(
    payload: string | object | Buffer,
    secret: jwt.Secret,
    options: jwt.SignOptions
  ): Promise<string | undefined> {
    return new Promise((res, rej) => {
      jwt.sign(payload, secret, options, (err, encoded) => {
        if (err) {
          return rej(err);
        }
        return res(encoded);
      });
    });
  }

  public static verify(
    token: string,
    secret: string
  ): Promise<object | undefined> {
    return new Promise((res, rej) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return rej(err);
        }
        return res(decoded);
      });
    });
  }
}

export default JWT;
