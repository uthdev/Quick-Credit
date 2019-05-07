import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class AccountValidator {
  static  createAccountValidator (req, res, next) {
    const client = req.body;

    const clientProperties = {
      firstname: 'required|alpha|min:2|max:50',
      lastname: 'required|alpha|min:2|max:50',
      email: 'required|email|max:50',
      password: 'required|alpha_dash|min:6|max:20',
      address: 'required|min:10|max:50',
    }

    const validator = new Validator(client, clientProperties, customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
  }

  static loginValidator (req, res, next) {
    const user = req.body;

    const userProperties = {
      email: 'required|email|max:50',
      password: 'required|alpha_dash|min:6|max:20',
    }

    const validator = new Validator(user, userProperties, customErrorMsgs);

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
