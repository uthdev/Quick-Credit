import data from '../mocks/mockData';

const { loans } = data;

export default class LoanController {
  static async getAll (req, res) {
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
}