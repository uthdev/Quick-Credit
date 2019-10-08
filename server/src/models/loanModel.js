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
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  static async getAll() {
    const queryString = 'SELECT * FROM loans';
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return MediaStreamError;
    }
  }

  static async findLoanById(loanId) {
    const queryString = 'SELECT  * FROM loans WHERE id = $1';
    const param = [loanId];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  static async updateLoan(loanId, columnsToUpdate, updateValue,) {
    let queryString;
    if (typeof columnsToUpdate === 'object') {
      queryString = `UPDATE loans 
      SET ${columnsToUpdate[0].replace(/"/g, '')} = '${updateValue[0]}', ${columnsToUpdate[1].replace(/"/g, '')} = '${updateValue[1]}' 
      WHERE id = '${loanId}' RETURNING *`;
    } else {
      queryString = `UPDATE loans 
      SET ${columnsToUpdate.replace(/"/g, '')} = '${updateValue}' 
      WHERE id = '${loanId}' RETURNING *`;
    }
    try {
      const { rows } = await pool.query(queryString);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  static async findCurrentLoanByUser(email) {
    const queryString = 'SELECT * FROM loans WHERE user_email = $1 AND status = $2 AND repaid = $3';
    const params = [email, 'approved', false];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  static async filterLoans(filterValues, filterCriteria) {
    let queryString;
    if (typeof filterValues === 'object') {
      queryString = `SELECT * FROM loans WHERE status = '${filterValues[0]}' AND repaid = '${filterValues[1]}'`;
    } else {
      queryString = `SELECT * FROM loans WHERE ${filterCriteria} = '${filterValues}'`;
    }
    try {
      const { rows } = await pool.query(queryString);
      return rows;
    } catch (error) {
      return error;
    };
  };
};

export default Loan;
