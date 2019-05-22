import { validate } from '../helpers/validatorjs';

export default class AccountValidator {
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
}
