import User from '../models/userModel';
import { generateHash, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';
import { successResponse, errorResponse } from '../helpers/functions';

/**
 * @class AuthController
 * @description Controllers for Users
 * @exports AuthController
 */
export default class AuthController {
  /**
   * @method signUp
   * @description Method for user registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async signUp(req, res) {
    try {
      const user = new User(req.body);
      user.password = generateHash(user.password);
      const userExists = await User.findUserByEmail(user.email);
      if (userExists) {
        return errorResponse(res, 409, 'This email address is already registered');
      }
      const newUser = await user.createAccount();
      const {
        id, email, firstname: firstName, lastname: lastName, status, isAdmin
      } = newUser;
      const token = await Jwt.generateToken({
        id, email, status, isAdmin, firstName, lastName
      });
      const response = {
        token, id, firstName, lastName, email
      };
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
  
  /**
   * @method login
   * @description Method for user sign in
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findUserByEmail(email);
      if (!user) {
        return errorResponse(res, 404, 'User does not exist');
      }
      const {
        id, password: hashedPassword, status, isadmin, firstname: firstName, lastname: lastName,
      } = user;
      const isMatch = comparePassword(password, hashedPassword);
      if (!isMatch) {
        return errorResponse(res, 401, 'Invalid  password/email');
      }
      const token = await Jwt.generateToken({
        id, email, status, isadmin, firstName, lastName
      });
      const response = {
        token, id, firstName, lastName, email
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
