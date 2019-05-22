import { validate } from '../helpers/validatorjs';

export default class QueryValidator {
  static async validateQuery (req, res, next) {
    const query = req.query;

    const queryProperties = {
      status: 'in:approved',
      repaid: 'boolean|required_if:status,approved'
    }

    try {
      await validate(res, next, query, queryProperties);
    } catch (error) {
      return error;
    }
  }
}
