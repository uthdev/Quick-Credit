import pool from './index';

console.log('Dropping tables...');

(async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS loans CASCADE');
    await pool.query('DROP TABLE IF EXISTS repayments CASCADE');
  } catch (error) {
    console.log(error);
  }
  console.log('All tables dropped');
})();