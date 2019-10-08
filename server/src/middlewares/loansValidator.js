import validate from '../helpers/validatorjs';

/**
 * @class LoanValidator
 * @description validates Loan details
 * @exports LoanValidator
 */
export default class LoanValidator {
  /**
   * @method loanApplicationValidator
   * @description Method to validates create loan application details
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {Object} response object if validation fails or next() function when it passes
   */
  static async loanApplicationValidator(req, res, next) {
    const loan = req.body;

    const loanProperties = {
      tenor: 'required|integer|min:1|max:12',
      amount: 'required|numeric|min:50000|max:2000000'
    };
    try {
      await validate(res, next, loan, loanProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method filterQuery
   * @description Method to validates get current and unrepaid loans query params
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async filterQuery(req, res, next) {
    const { query } = req;

    const queryProperties = {
      status: 'string|in:approved,rejected,pending',
      repaid: 'boolean|in:true,false'
    };
    try {
      await validate(res, next, query, queryProperties);
    } catch (error) {
      return error;
    }
  }

  /**
   * @method loanId
   * @description Method to validates loanId param
   * @param  {object} req - The request object
   * @param  {object} res - The res response object
   * @param  {function} next - The next() Function
   * @returns {object} response object if validation fails or next() function when it passes
   */
  static async loanId(req, res, next) {
    const id = req.params;

    const idProperties = {
      loanId: 'numeric|min:1|max:10000',
    };
    try {
      await validate(res, next, id, idProperties);
    } catch (error) {
      return error;
    }
  }
}
