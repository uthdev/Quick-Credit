import pool from './index';
import { generateHash } from '../helpers/bcrypt'; 
//seed admin
(async () => {
  const password = 'jackJones92';
  const hashedPassword = generateHash(password);
  const params = ['adelekegbolahan92@yahoo.com', 'Gbolahan', 'Adeleke', hashedPassword, 'No 2, Alhaji Olakunle Street, Ijeshatedo, Surulere, Lagos', 'verified', true];
  try {
    const result = await pool.query('INSERT INTO users (email, firstname, lastname, password, address, status, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7)', params);
    console.log('Admin seeded');
    return result;
  } catch (error) {
     console.log(error);
  }
})();

(async () => {
  const password = '3eyedRaven';
  const hashedPassword = generateHash(password);
  const params = ['tombraddy@yahoo.com', 'Tom', 'Braddy', hashedPassword, 'I7, oshodi-isale, lagoss', 'verified', false];
  try {
    const result = await pool.query('INSERT INTO users (email, firstname, lastname, password, address, status, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7)', params);
    console.log('Unrepaid Loan Owner seeded');
    return result;
  } catch (error) {
     console.log(error);
  }
})();


(async () => {
  try {
    const result =  await pool.query(`INSERT INTO loans (user_email, createdon, status, repaid, tenor, amount, payment_installment, balance, interest) VALUES 
    ('Seep1979@fleckens.hu', '2019-05-08', 'pending', false, 10, 500000.00, 52500.00, 0.00, 25000.00), ('tombraddy@yahoo.com', '2018-02-20', 'approved', true, 10, 1000000.00, 105000.00, 0.00, 50000.00), ('nasirhassan04@gmail.com', '2018-12-31', 'rejected', false, 1, 1000000.00, 1050000.00, 0.00, 50000.00), ('tombraddy@yahoo.com', '2018-02-20', 'approved', false, 10, 1000000.00, 105000.00, 105000.00, 50000.00)`);
    console.log('loans seeded');
    return result;
  } catch (error) {
    console.log(error);
  }
})();