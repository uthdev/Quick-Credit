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
}