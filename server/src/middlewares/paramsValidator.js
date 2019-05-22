import { validate } from '../helpers/validatorjs';

export default class ParamsValidator {
  static async userEmail (req, res, next) {
    const email  = req.params;
    
    const emailProperties = {
      userEmail: 'required|email|max:50',
    }

    try {
      await validate(res, next, email, emailProperties);
    } catch (error) {
      return error;
    }
  } 

  static async loanId (req, res, next) {
    const id = req.params;

    const idProperties = {
      loanId: 'numeric|min:1|max:10000',
    }

    try {
      await validate(res, next, id, idProperties);
    } catch (error) {
      return error;
    } 
  }
}