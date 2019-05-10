import Loan from '../models/loanModel';
import data from '../mocks/mockData';
import Repayment from '../models/repaymentModel';


const { loans , repayments } = data;

export default class LoanController {
  static async getAll (req, res, next) {
    const { status, repaid } = req.query;

    if(status && repaid) {
      return next() 
    }
    if (loans.length <= 0) {
      return res.status(404).json({
        status: 404,
        message: 'No loan application available'
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: loans
      });
    }
  }

  static async getSpecificLoan (req, res) {
    const { loanId } = req.params;

    const loan = loans.find(existingLoan => existingLoan.id === Number(loanId));

    if(!loan) {
      return res.status(404).json({
        status: 404,
        error: `Loan application with id: ${loanId} not found`,
      });
    }
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  static async currentRepaid (req, res) {
    const status = req.query.status;
    const repaid = JSON.parse(req.query.repaid);
    const repaidUnrepaid = loans.filter(existingLoan => existingLoan.status === status && existingLoan.repaid === repaid)

    if(repaidUnrepaid.length <= 0 && repaid === false) {
      return res.status(404).json({
        status: 404,
        error: 'No current loan!',
      });
    } else if (repaidUnrepaid.length <= 0 && repaid === true) {
      return res.status(404).json({
        status: 404,
        error: 'No repaid loan!',
      });
    }
    return res.status(200).json({
      status: 200,
      data: repaidUnrepaid,
    })
  }

  static async approveRejectLoan (req, res) {
    const { loanId } = req.params;
    const { status } = req.body;
    const loan = loans.find(existingLoan => existingLoan.id === Number(loanId));

    if(!loan) {
      return res.status(404).json({
        status: 404,
        error: `Loan application with id: ${ loanId } not found`,
      });
    }
    
    loan.status = status;

    const { amount : loanAmount, tenor, paymentInstallment : monthlyInstallment, interest } = loan;
    
    const response = { loanId, loanAmount, tenor, status, monthlyInstallment, interest }
    return res.status(200).json({
      status: 200,
      data: response,
    });    
  }

  static async createLoanApplication (req, res) {
    const loanId = loans.length + 1;
    const { email, firstname, lastname } = req.user;
    const { tenor, amount } = req.body;

    const loan = await new Loan(loanId, email, tenor, amount);
    const hasUnrepaidLoan = loans.find( existingLoan => existingLoan.user === email && existingLoan.repaid === false && existingLoan.status === 'approved');
    
    if(hasUnrepaidLoan) {
      return res.status(403).json({
        status: 403,
        message: 'You still have a current loan. You can only apply for another after it is paid up'
      });
    }

    loans.push(loan);
    const { status, paymentInstallment, balance, interest } = loan;
    const response = { loanId, firstname, lastname, email, tenor, amount, paymentInstallment, status, balance, interest };
    return res.status(201).json({
      status: 200,
      data: response,
    })
  }

  static async createRepaymentTransaction(req, res)  {
    const { loanId } = req.params;
    const repaymentId = repayments.length + 1;
    const loan = loans.find(existingLoan => existingLoan.id === Number(loanId));

    if(!loan) {
      return res.status(404).json({
        status: 404,
        error: `Loan application with id: ${ loanId } not found`,
      });
    }
    if(loan.status === 'pending' || loan.status === 'rejected' || loan.repaid === true) {
      return res.status(403).json({
        status: 403,
        error: `Loan application with id: ${loanId} is not approved or repaid`
      })
    }   
    const { amount, paymentInstallment : monthlyInstallment, balance } = loan;
    const newBalance = balance - monthlyInstallment;
    const totalPayable = amount + ( amount * 0.05 )
    const paidAmount = totalPayable - newBalance;
    const repayment = await new Repayment(repaymentId, loanId, amount, monthlyInstallment);
    loan.balance = newBalance;
    
    if(loan.balance === 0) {
      loan.repaid = true;
    }
    repayments.push(repayment);
    const { id, createdOn } = repayment
    const response = {
      id, loanId, createdOn, amount, monthlyInstallment, paidAmount, balance: newBalance,  
    }
    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async getRepaymentHistory(req, res) {
    const { loanId } = req.params;

    const repaymentHistory = repayments.filter(loanRepayment => Number(loanRepayment.loanId) === Number(loanId));
    if(repaymentHistory.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'No repayment made'
      });
    }
    return res.status(200).json({
      status: 200,
      data: repaymentHistory
    });
  }
}