import User from '../models/userModel';
import { generateHash, comparePassword } from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';

export default class AuthController {
  static async signUp (req, res) {
    const user = new User(req.body);
    user.password =  generateHash(user.password);
    try {
      const rows = await User.findUserByEmail(user.email);
      if (rows.length > 0) {
        return res.status(409).json({
          status: 409,
          message: 'This email address is already registered'
        });
      } 
    } catch (error) {
      return error.message;
    }
    let newUser;
    try {
      newUser = await user.createAccount();   
    } catch(error) {
      return error.message;
    }
    const {
      id, email, firstname : firstName, lastname : lastName, status, isAdmin
    } = newUser; 
    const authData = {
      id, email, status, isAdmin, firstName, lastName
    }
    const token = await Jwt.generateToken(authData);
    const response = {
      token, id, firstName, lastName, email
    }
    return res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static async login (req, res) {
    const { email, password } = req.body;
    const rows = await User.findUserByEmail(email);
    if (rows.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }
    const user = rows[0];
    const { password: hashedPassword } = user;
    const isMatch = comparePassword(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid  password/email',
      });
    }

    const {
      id, status, isadmin, firstname : firstName, lastname : lastName, 
    } = user;

    const token = await Jwt.generateToken({
      id, email, status, isadmin, firstName, lastName
    });

    const response = {
      token, id, firstName, lastName, email
    }
    return res.status(200).json({
      status: 200,
      data: response,
    });
  }
}