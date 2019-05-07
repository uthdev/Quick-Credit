import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class ParamsValidator {
  static async userEmail (req, res, next) {
    const email  = req.params;
    
    const emailProperties = {
      userEmail: 'required|email|max:50',
    }

    const validator = new Validator(email, emailProperties, customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  } 
}