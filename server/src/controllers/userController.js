import data from '../mocks/mockData';
const { users } = data;

export default class Usercontroller {
  static async verifyClient (req, res) {
    const { userEmail } = req.params;
    
    const client = users.find(existingUser => existingUser.email === userEmail);
    if(!client) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      })
    }
    const { email, firstname, lastname, password, address, status } = client;

    const response = {email, firstname, lastname, password, address, status };

    client.status = 'verified';
    return res.status(200).json({
      status: 200,
      data: response,
    });    
  }
}