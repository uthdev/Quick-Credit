import User from '../models/userModel';
import data from '../mocks/mockData';

const { users } = data;

export default class Usercontroller {
  static async verifyClient (req, res) {
    const { userEmail } = req.params;
    try {
      const rows = await User.findUserByEmail(userEmail);
      if(rows.length <= 0) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist',
        })
      }
      const verifiedRows = await User.updateUser(userEmail, 'status', 'verified');
      const verifiedUser = verifiedRows[0];    
      const { email, firstname, lastname, password, address, status } = verifiedUser;
      const response = {email, firstname, lastname, password, address, status };
      
      return res.status(200).json({
        status: 200,
        data: response,
      });    
    } catch (error) {
      return error;
    }
  }
}