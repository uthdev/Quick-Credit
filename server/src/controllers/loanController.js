import data from '../mocks/mockData';

const { loans } = data;

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
        error: `Loan application with id: ${loanId} not found`,
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
}