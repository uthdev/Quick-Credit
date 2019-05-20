import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

export default class Jwt {
  static async generateToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '1d' });
    return token;
  }

  static async verifyToken(token) {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  }
}

