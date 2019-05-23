import pool from '../database/index';
const interestRate = process.env.INTEREST_RATE;

class Loan {
  constructor(user, tenor, amount) {
    this.id = undefined;
    this.user = user;
    this.createdOn = new Date(Date.now());
    this.status = 'pending';
    this.repaid = false;
    this.tenor = tenor;
    this.amount = amount;
    this.paymentInstallment = (amount + (interestRate * amount)) / tenor;
    this.balance = 0.00;
    this.interest = interestRate * amount;
  }

  async createLoanApplication() {
    const queryString = 'INSERT INTO loans (user_email, createdon, status, repaid, tenor, amount, payment_installment, balance, interest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const params = [this.user, this.createdOn, this.status, this.repaid, this.tenor, this.amount, this.paymentInstallment, this.balance, this.interest];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async getAll () {
    const queryString = 'SELECT * FROM loans';
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async findLoanById(loanId) {
    const queryString = 'SELECT  * FROM loans WHERE id = $1';
    const param = [loanId];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async updateLoan(loanId, valueToUpdate , updateValue, ) {
    const queryString = `UPDATE loans SET ${valueToUpdate.replace(/"/g, '')} = $1 WHERE id = $2 RETURNING *`
    const params = [updateValue, loanId];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  static async findCurrentLoanByUser (email) {
    const queryString = `SELECT * FROM loans WHERE user_email = $1 AND status = $2 AND repaid = $3`;
    const params = [email, 'approved', false];
    try {
      const { rowCount } = await pool.query(queryString, params);
      return rowCount;
    } catch (error) {
      return error;
    }
  }

  static async findCurrentRepaid(status, repaid) {
    const queryString = `SELECT * FROM loans WHERE status = $1 AND repaid = $2 `
    const params = [status, repaid];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }
}


export default Loan;
