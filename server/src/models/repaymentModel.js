import pool from '../database/index';

class Repayment {
  constructor(loanId, amount, monthlyInstallment) {
    this.id = undefined;
    this.createdOn = new Date(Date.now());
    this.loanId = loanId;
    this.amount = amount;
    this.monthlyInstallment = monthlyInstallment;
  }

  async createRepayment() {
    const queryString = 'INSERT INTO repayments (loan_id, amount, monthly_installment) VALUES ($1, $2, $3) RETURNING *';
    const params = [this.loanId, this.amount, this.monthlyInstallment];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  static async getRepaymentHistory(loanId) {
    const queryString = `SELECT * FROM repayments WHERE loan_id = ${loanId}`;
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default Repayment;
