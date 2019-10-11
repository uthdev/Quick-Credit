import bcrypt from 'bcryptjs';

/**
   *  @method generateHash
   * @description  Hash Password Method
   * @param {string} password the password to hash
   * @returns {string} returns hashed password
   */
export const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
   *  @method comparePassword
   * @description  * comparePassword
   * @param {string} password the password to compare
   * @param {string} hash the hash to compare with the password
   * @returns {Boolean} return True or False
   */
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
