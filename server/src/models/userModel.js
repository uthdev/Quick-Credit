import pool from '../database/index';

class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.password = user.password;
    this.address = user.address;
    this.status = user.status;
    this.isAdmin = user.isadmin;
  }

  async createAccount() {
    const status = 'unverified';
    const queryString = `INSERT INTO users (email, firstname, lastname, password, address, status)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [this.email, this.firstName, this.lastName,
      this.password, this.address, status];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows[0];
    } catch (error) {
      return error.message;
    }
  }

  static async findUserByEmail(email) {
    const queryString = 'SELECT  * FROM users WHERE email = $1';
    const param = [email];
    try {
      const { rows } = await pool.query(queryString, param);
      return rows;
    } catch (error) {
      return error.message;
    }
  }

  static async updateUser (email, valueToUpdate, updateValue) {
    const queryString = `UPDATE users SET ${valueToUpdate.replace(/"/g, '')} = $1 WHERE email = $2 RETURNING *`;
    const params = [updateValue, email];
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default User;
