import Jwt from '../helpers/jwt';
import { errorResponse } from '../helpers/functions';

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
export default class Authenticate {
  /**
   * @method verifyToken
   * @description Method to verify user Bearer token
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 401, 'Authorization token required');
    }
    try {
      const decoded = await Jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, 403, 'Authorisation failed! Token expired');
      }
      return errorResponse(res, 403, `Authorization fail! ${error.message}`);
    }
  }

  /**
   * @method adminAccess
   * @description verify if user role is admin
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async adminAccess(req, res, next) {
    const { isadmin } = req.user;
    if (isadmin !== true) {
      return errorResponse(res, 403, 'Unauthorized! Accessible to admin only');
    }
    next();
  }

  /**
   * @method nonAdminAccess
   * @description verify if user role is not admin
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async nonAdminAccess(req, res, next) {
    const { isadmin } = req.user;
    if (isadmin) {
      return errorResponse(res, 403, 'Unauthorized access! Not accessible to admin');
    }
    next();
  }

  /**
   * @method isVerified
   * @description verify if user is verified
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async isVerified(req, res, next) {
    const { status } = req.user;
    if (status !== 'verified') {
      return errorResponse(res, 403, 'User not verified');
    }
    next();
  }

  /**
   * @method isSuperAdmin
   * @description verify if user is superAdmin
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {String} response object if authentication fails or next() function when it passes
   */
  static async isSuperAdmin(req, res, next) {
    const { email } = req.user;
    if (email !== process.env.SUPER_ADMIN_EMAIL) {
      return errorResponse(res, 403, 'Unauthorized access! accessible to Super Admin only');
    }
    next();
  }
}
