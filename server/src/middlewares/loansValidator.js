import { validate } from '../helpers/validatorjs';

export default class LoanValidator {
  static async approveLoanValidator(req, res, next) {
    const status = req.body;

    const statusProperties = {
      status: 'required|in:approved,rejected'
    };

    try {
      await validate(res, next, status, statusProperties );
    } catch (error) {
      return error;
    }
  }

  static async loanApplicationValidator (req, res, next) {
    const loan = req.body;

    const loanProperties = {
      tenor: 'required|integer|min:1|max:12',
      amount: 'required|numeric|min:50000|max:2000000'
    }
    try {
      await validate(res, next, loan, loanProperties);
    } catch (error) {
      return error;
    }
  }
}