import User from '../models/userModel';
const userFinder = async (res, email) => { 
  try {
    const rows = await User.findUserByEmail(email);
    if(rows.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      })
    } 
    return rows[0];
  } catch (error) {
    return error;
  }
}

const userUpdator = async (userEmail ,columnToUpdate, updateValue) => {
  try {
    const updatedRows = await User.updateUser(userEmail, columnToUpdate, updateValue);
    return updatedRows[0];   
  } catch (error) {
    return error;
  }
}


export default class Usercontroller {
  static async verifyClient (req, res) {
    const { userEmail } = req.params;
    try {
      await userFinder(res, userEmail);
      const verifiedUser = await userUpdator(userEmail, 'status', 'verified');
      const { email, firstname, lastname, address, status } = verifiedUser;
      const response = { email, firstname, lastname, address, status };  
      return res.status(200).json({
        status: 200,
        data: response,
      });    
    } catch (error) {
      return error;
    }  
  }

  static async makeAdmin(req, res) {
    const { userEmail } = req.params;
    try {
      const user = await userFinder(res, userEmail);
      if (user.status === 'unverified') {
        return res.status(403).json({
          status: 403,
          error: 'User must be verified to be admin'
        })
      }
      const adminUser = await userUpdator(userEmail, 'isadmin', true); 
      const { email, firstname, lastname, address, status, isadmin } = adminUser;
      const response = { email, firstname, lastname, address, status, isadmin };  
      return res.status(200).json({
        status: 200,
        data: response,
      });    
     } catch (error) {
      return error;
    }   
  }
}