import pool from './index';

console.log('Creating tables...');

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email text NOT NULL,
      firstname text NOT NULL,
      lastname text NOT NULL,
      password text NOT NULL,
      address text NOT NULL,
      status text NOT NULL,
      isadmin BOOLEAN DEFAULT FALSE)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS loans(
      id SERIAL PRIMARY KEY,
      user_email text NOT NULL,
      createdon TIMESTAMPTZ DEFAULT NOW(),
      status text NOT NULL,
      repaid BOOLEAN DEFAULT FALSE,
      tenor INT NOT NULL,
      amount FLOAT NOT NULL,
      payment_installment FLOAT NOT NULL,
      balance FLOAT, 
      interest FLOAT NOT NULL)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS repayments(
      id SERIAL PRIMARY KEY,
      createdon TIMESTAMPTZ DEFAULT NOW(),
      loan_id INT NOT NULL,
      amount FLOAT NOT NULL,
      monthly_installment FLOAT NOT NULL,
      FOREIGN KEY (loan_id) REFERENCES loans (id) ON DELETE CASCADE)`);
  } catch (error) {
    console.log(error);
  }
  console.log('Tables created');
})();