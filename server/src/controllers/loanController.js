import sgMail from '@sendgrid/mail';
import Loan from '../models/loanModel';
import data from '../mocks/mockData';
import Repayment from '../models/repaymentModel';


const mailSender = async (loan) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let msg;
  if (loan.status === 'approved') {
    msg = {
      to: loan.user_email,
      from: 'adelekegbolahan92@gmail.com',
      subject: 'Quick credit loan application',
      html: `<p>We are glad to notify you that your loan application of ${loan.amount} has been approved.</p><strong>Please reach us through this mail for any information you require</strong>`,
    };
  }
  if (loan.status === 'rejected') {
    msg = {
      to: loan.user_email,
      from: 'services@quick-credit.com',
      subject: 'Quick credit loan application ',
      html: `<p>We are sorry to notify you that your loan applicationof ${loan.amount} has been rejected.</p><strong>Please reach us through this mail for any information you require</strong>`,
    };
  }
  await sgMail.send(msg);
}

const loanFinder = async (req, res, loanId) => {
  try {
    const rows = await Loan.findLoanById(loanId);
    if(rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: `Loan application with id: ${loanId} not found`,
      });
    } 
  return rows[0];
  } catch (error) {
    return error;
  } 
}

export default class LoanController {
  static async getAll (req, res, next) {
    const { status, repaid } = req.query;

    if(status && repaid) {
      return next() 
    }
    try {
      const loans = await Loan.getAll();
      if ( loans <= 0) {
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
    } catch(error) {
      return error;
    } 
    
  }

  static async getSpecificLoan (req, res) {
    const { loanId } = req.params;
    try {
      const loan = await loanFinder(req, res, loanId);
      return res.status(200).json({
        status: 200,
        data: loan,
      }); 
    } catch (error) {
      return error;
    }
  }

  static async currentRepaid (req, res) {
    const status = req.query.status;
    const repaid = JSON.parse(req.query.repaid);
    try {
      const repaidUnrepaid = await Loan.findCurrentRepaid(status, repaid);
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
      });
    } catch (error) {
      return error;
    }
  }

  static async approveRejectLoan (req, res) {
    const { loanId } = req.params;
    const { status } = req.body;
    try {
      await loanFinder(loanId);
      const rows = await Loan.updateLoan(loanId, 'status', status);
      const approvedOrRejected = rows[0];
      await mailSender(approvedOrRejected);
      const { amount : loanAmount, tenor, payment_installment : monthlyInstallment, interest } = approvedOrRejected;
      if (status === 'approved') {
        const totalPayable = loanAmount + interest;
        await Loan.updateLoan(loanId, 'balance', totalPayable);
      }
      const response = { loanId, loanAmount, tenor, status, monthlyInstallment, interest }
      return res.status(200).json({
        status: 200,
        data: response,
      });    
    } catch (error) {
      return error;
    }  
  }

  static async createLoanApplication (req, res) {
    const { email, firstname, lastname } = req.user;
    const { tenor, amount } = req.body;
    try {
      const rowCount = await Loan.findCurrentLoanByUser(email);
      if(rowCount > 0) {
        return res.status(403).json({
          status: 403,
          message: 'You still have a current loan. You can only apply for another after it is paid up'
        });
      }

      const loan = await new Loan( email, tenor, amount);
      const rows = await loan.createLoanApplication();
      const newLoan = rows[0];
      const {id : loanId,  status, payment_installment : paymentInstallment, balance, interest } = newLoan;
      const response = { loanId, firstname, lastname, email, tenor, amount, paymentInstallment, status, balance, interest };
      return res.status(201).json({
        status: 201,
        data: response,
      })
    } catch (error) {
      return error;
    }
    
  }

  static async createRepaymentTransaction(req, res)  {
    const { loanId } = req.params;
    try {
      const loan = await loanFinder(loanId);
      if(loan.status === 'pending' || loan.status === 'rejected' || loan.repaid === true) {
        return res.status(403).json({
          status: 403,
          error: `Loan application with id: ${loanId} is not approved or repaid`
        })
      }  
      const { amount, payment_installment : monthlyInstallment, balance } = loan;
      const newBalance = balance - monthlyInstallment;
      const totalPayable = amount + ( amount * 0.05 )
      const paidAmount = totalPayable - newBalance;
      const repayment = await new Repayment(loanId, amount, monthlyInstallment);
      
      const newRows = await Loan.updateLoan(loanId, 'balance', newBalance); 
      const updatedLoan = newRows[0];
      if(updatedLoan.balance <= 0) {
        await Loan.updateLoan(loanId, 'repaid', true);
      }
      const repaymentRow = await repayment.createRepayment();
      const newRepayment = repaymentRow[0];
      const { id, createdon } = newRepayment;
      const response = {
        id, loanId, createdon, amount, monthlyInstallment, paidAmount, balance: newBalance,  
      }
      return res.status(201).json({
        status: 201,
        data: response,
      });
    } catch (error) {
      return error;
    }
     
    
  }

  static async getRepaymentHistory(req, res) {
    const { loanId } = req.params;
    const { email } = req.user;
    try {
      const loan = await loanFinder(loanId);
      if (loan.user_email !== email ) {
        return res.status(409).json({
          status: 409,
          error: 'Unauthorize access! Invalid token'
        });
      }
      const repaymentHistory = await Repayment.getRepaymentHistory(loanId);
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
    } catch (error) {
      return error
    }
  }
}