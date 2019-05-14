import bcrypt from 'bcryptjs';

// export const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// export const comparePassword = (hash, password) => bcrypt.compareSync(hash, password);

export default class Bcrypt {
  static async generateHash (password) {
    const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return passwordHash
  }

  static async comparePassword(password, hash) {
    const match = await bcrypt.compareSync(password, hash);
    return match;
  }
}