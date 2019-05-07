import User from '../models/userModel';
import data from '../mocks/mockData';
// import { generateHash } from '../helpers/bcrypt';
import Bcrypt from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';
const { users } = data;
const { generateHash, comparePassword } = Bcrypt;


export default class UsersController {
  static async signUp (req, res) {
    const id = users.length + 1;
    const user =  await new User(req.body);
    console.log(user);
    const userExist = users.find(existingUser => existingUser.email === user.email);
    if (userExist) {
      return res.status(409).json({
        status: 409,
        message: 'This email address is already taken'
      });
    }
    user.password = await generateHash(user.password);
    user.id = id;
    user.status = 'unverified';
    user.isAdmin = false;
    const {
      email, firstname, lastname, status, isAdmin, password
    } = user;  
    const authData = {
      id, email, status, isAdmin
    }

    const token = await Jwt.generateToken(authData);  

    users.push(user);
    const response = {
      token, id, firstname, lastname, email, password
    }
    return res.status(201).json({
      status: 201,
      data: response,
    });
    
  }

  static async login (req, res) {
    const { email, password } = req.body;
    const user = users.find(existingUser => existingUser.email === email);
    
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }

    const { password: hashedPassword } = user;
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid  password/email',
      });
    }

    const {
      id, status, isadmin, firstname, lastname
    } = user;

    const token = await Jwt.generateToken({
      id, email, status, isadmin
    });

    const response = {
      token, id, firstname, lastname, email
    }
    return res.status(200).json({
      status: 200,
      data: response,
    });
  }
}