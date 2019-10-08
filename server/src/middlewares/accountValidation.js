import validate from '../helpers/validatorjs';

/**
 * @class AccountValidator
 * @description validates User details for account creation
 * @exports AccountValidator
 */
export default class AccountValidator {
  /**
   * @method createAccountValidator
   * @description Method to validates signup details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async createAccountValidator(req, res, next) {
    const client = req.body;

    const clientProperties = {
      firstname: 'required|alpha|min:2|max:50',
      lastname: 'required|alpha|min:2|max:50',
      email: 'required|email|max:50',
      password: 'required|alpha_dash|min:6|max:20',
      address: 'required|min:10|max:50',
    };
    
    try {
      await validate(res, next, client, clientProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method loginValidator
   * @description Method to validates user login details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async loginValidator(req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|alpha_dash|min:6|max:20',
    };
    
    try {
      await validate(res, next, user, userProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method userEmail
   * @description Method to validates user email param
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async userEmail(req, res, next) {
    const email = req.params;
    
    const emailProperties = {
      userEmail: 'required|email|max:50',
    };
    try {
      await validate(res, next, email, emailProperties);
    } catch (error) {
      return error;
    }
  }
}
