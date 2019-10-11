import User from '../models/userModel';
import Loan from '../models/loanModel';
import { errorResponse } from '../helpers/functions';

/**
 * @class Services
 * @description Checks availability of resource
 * @exports Services
 */
class Services {
  /**
   * @method loanExist
   * @description Method to check if loan exist
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if check fails or next() function when it passes
   */
  static async loanExist(req, res, next) {
    const { loanId } = req.params;
    try {
      const loan = await Loan.findLoanById(loanId);
      if (!loan) {
        return errorResponse(res, 404, `Loan application with id: ${loanId} not found`);
      }
      req.loan = loan;
      next();
    } catch (error) {
      return error;
    }
  }

  /**
   * @method userExist
   * @description Method to check if user exist
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if check fails or next() function when it passes
   */
  static async userExist(req, res, next) {
    const { userEmail } = req.params;
    try {
      const client = await User.findUserByEmail(userEmail);
      if (!client) {
        return errorResponse(res, 404, 'User does not exist');
      }
      req.client = client;
      next();
    } catch (error) {
      return error;
    }
  }
}

export default Services;
