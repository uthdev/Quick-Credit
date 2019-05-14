import Validator from 'validatorjs';
import customErrorMsgs from '../helpers/customErrorMsgs';

export default class QueryValidator {
  static async validateQuery (req, res, next) {
    const query = req.query;

    const queryProperties = {
      status: 'in:approved',
      repaid: 'boolean|required_if:status,approved'
    }

    const validator = new Validator(query, queryProperties, customErrorMsgs);

    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    })

  }
}
