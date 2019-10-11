import User from '../models/userModel';
import { successResponse, errorResponse } from '../helpers/functions';

/**
 * @class UserController
 * @description Controllers for handling user requests
 * @exports UserController
 */
export default class Usercontroller {
  /**
   * @method verifyClient
   * @description Method to verify a new client
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} the response object
   */
  static async verifyClient(req, res) {
    const { userEmail } = req.params;
    try {
      const verifiedUser = await User.updateUser(userEmail, 'status', 'verified');
      const {
        email, firstname: firstName, lastname: lastName, address, status
      } = verifiedUser;
      const response = {
        email, firstName, lastName, address, status
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method makeAdmin
   * @description Method to upgrade user to admin
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} the response object
   */
  static async makeAdmin(req, res) {
    const { params: { userEmail }, client } = req;
    try {
      if (client.status === 'unverified') {
        return errorResponse(res, 403, 'User must be verified to be admin');
      }
      const upgradedUser = await User.updateUser(userEmail, 'isadmin', true);
      const {
        email, firstname: firstName, lastname: lastName, address, status, isadmin: isAdmin
      } = upgradedUser;
      const response = {
        email, firstName, lastName, address, status, isAdmin
      };
      return successResponse(res, 200, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }
}
