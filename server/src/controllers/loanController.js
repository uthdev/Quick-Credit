import mailSender from '../helpers/sgMail';
import Loan from '../models/loanModel';
import Repayment from '../models/repaymentModel';
import { successResponse, errorResponse, calculatePaidAmount } from '../helpers/functions';

const reactToLoan = async (req, res, status) => {
  const { loan, params: { loanId } } = req;
  try {
    const {
      amount: loanAmount, tenor, payment_installment: monthlyInstallment, interest
    } = loan;
    let approvedOrRejected;
    if (status === 'approved') {
      const totalPayable = Number(loanAmount) + Number(interest);
      approvedOrRejected = await Loan.updateLoan(loanId, ['status', 'balance'], [status, totalPayable]);
    } else {
      approvedOrRejected = await Loan.updateLoan(loanId, 'status', status);
    }
    await mailSender(approvedOrRejected);
    const response = {
      loanId, loanAmount, tenor, status, monthlyInstallment, interest
    };
    return successResponse(res, 200, response);
  } catch (error) {
    return errorResponse(res, 500, 'Internal server error');
  }
};

/**
 * @class LoanController
 * @description Controllers for handling loan requests
 * @exports LoanController
 */
export default class LoanController {
  /**
   * @method getAll
   * @description Method to get all loans
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {function} next - The next function
   * @returns {object} All loan details or the next function if there is a query params
   */
  static async getAll(req, res, next) {
    const { status, repaid } = req.query;
    if (status || repaid) {
      return next();
    }
    try {
      const loans = await Loan.getAll();
      if (loans <= 0) {
        return errorResponse(res, 404, 'No loan application available');
      }
      return successResponse(res, 200, loans);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method getSpecificLoan
   * @description Method to get a specified loan with the loan Id
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} The response body with the specified loan object or error
   */
  static async getSpecificLoan(req, res) {
    const { loan } = req;
    try {
      return successResponse(res, 200, loan);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method currentRepaid
   * @description Method to get either all repaid loans or current loans
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} a response object with all current or repaid loans
   */
  static async currentRepaid(req, res) {
    const { status, repaid } = req.query;
    let filteredLoans;
    const column = status ? 'status' : 'repaid';
    try {
      if (status && repaid) {
        filteredLoans = await Loan.filterLoans([status, repaid]);
      } else {
        const filterValue = status || repaid;
        filteredLoans = await Loan.filterLoans(filterValue, column);
      }
      if (filteredLoans <= 0) {
        return errorResponse(res, 404, 'Loans not found');
      }
      return successResponse(res, 200, filteredLoans);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method approveLoan
   * @description Method to approve a specified loan
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} The response body with the specified approved loan object or error
   */
  static async approveLoan(req, res) {
    await reactToLoan(req, res, 'approved');
  }

  /**
   * @method rejectLoan
   * @description Method to reject a specified loan
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} The response body with the specified rejected loan object or error
   */
  static async rejectLoan(req, res) {
    await reactToLoan(req, res, 'rejected');
  }

  /**
   * @method createLoanApplication
   * @description Method to create a loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} The Response object with the newly created loan application or error
   */
  static async createLoanApplication(req, res) {
    const { body: { tenor, amount }, user: { email, firstname, lastname } } = req;
    try {
      const hasUnrepaid = await Loan.findCurrentLoanByUser(email);
      if (hasUnrepaid) {
        return errorResponse(res, 403, 'Existing Unrepaid loan');
      }
      const loan = new Loan(email, tenor, amount);
      const newLoan = await loan.createLoanApplication();
      const {
        id: loanId, status, payment_installment: paymentInstallment, balance, interest
      } = newLoan;
      const response = {
        loanId, firstname, lastname, email, tenor, amount, paymentInstallment, status, balance, interest
      };
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method createRepaymentTransaction
   * @description Method to create a repayment transaction
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} The Response object with the newly created repayment transaction or error
   */
  static async createRepaymentTransaction(req, res) {
    const { loan, params: { loanId } } = req;
    try {
      if (loan.status === 'pending' || loan.status === 'rejected' || loan.repaid === true) {
        return errorResponse(res, 403, `Loan application with id: ${loanId} is not approved or repaid`);
      }
      const { amount, payment_installment: monthlyInstallment, balance } = loan;
      const { paidAmount, newBalance } = calculatePaidAmount(balance, monthlyInstallment, amount);
      const repayment = new Repayment(loanId, amount, monthlyInstallment);
      const newRepayment = await repayment.createRepayment();
      if (newBalance <= 0) {
        await Loan.updateLoan(loanId, ['balance', 'repaid'], [newBalance, true]);
      } else {
        await Loan.updateLoan(loanId, 'balance', newBalance);
      }
      const { id, createdon } = newRepayment;
      const response = {
        id, loanId, createdon, amount, monthlyInstallment, paidAmount: paidAmount.toFixed(2), balance: newBalance.toFixed(2),
      };
      return successResponse(res, 201, response);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }

  /**
   * @method getRepaymentHistory
   * @description Method to get all loan repayments by a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} - The response object with all the user repayment history object
   */
  static async getRepaymentHistory(req, res) {
    const { loan, params: { loanId }, user: { email } } = req;
    try {
      if (loan.user_email !== email) {
        return errorResponse(res, 409, 'Unauthorize access! Invalid token');
      }
      const repaymentHistory = await Repayment.getRepaymentHistory(loanId);
      if (repaymentHistory.length <= 0) {
        return errorResponse(res, 404, 'No repayment made');
      }
      return successResponse(res, 200, repaymentHistory);
    } catch (error) {
      return errorResponse(res, 500, 'Internal server error');
    }
  }
}
