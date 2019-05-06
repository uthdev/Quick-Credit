import User from '../models/userModel';
import data from '../mocks/mockData';
// import { generateHash } from '../helpers/bcrypt';
import Bcrypt from '../helpers/bcrypt';
import Jwt from '../helpers/jwt';
const { users } = data;

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
    user.password = await Bcrypt.generateHash(user.password);
    user.id = id;
    user.status = 'unverified';
    user.isAdmin = false;
    const {
      email, firstname, lastname, password, address, status, isAdmin
    } = user;  
    const authData = {
      id, email, status, isAdmin
    }
    try {
      const token = await Jwt.generateToken(authData);  

      users.push(user);
      const response = {
        token, id, firstname, lastname, email,password, address
      }
      return res.status(201).json({
        status: 201,
        data: response,
      });
    } catch (error) {
      console.log(error);
    }  
    
  }
}