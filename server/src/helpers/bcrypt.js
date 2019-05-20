import bcrypt from 'bcryptjs';

export const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
