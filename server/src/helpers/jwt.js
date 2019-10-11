import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;
/**
 * @class Jwt
 * @description class for token generation and verification
 * @exports Jwt
 */
export default class Jwt {
  /**
   * @method generateToken
   * @description Method to generate new token
   * @param {object} payload - The data used to generate the token
   * @returns {string} the generated token
   */
  static async generateToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '1d' });
    return token;
  }

  /**
   * @method verifyToken
   * @description Method to decode the token
   * @param {string} token - The token to be verified
   * @returns {object} the payload decoded from the token
   */
  static async verifyToken(token) {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  }
}
