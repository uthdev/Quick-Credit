import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class LoanValidator {
  static async approveLoanValidator(req, res, next) {
    const status = req.body;

    const statusProperties = {
      status: 'required|in:approved,rejected'
    };

    const validator = new Validator(status, statusProperties, customErrorMsgs);
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