import Jwt from '../helpers/jwt';

export default class Access {
  static async verifyToken (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Authorization token required',
      });
    }
    
    try {
      const decoded = await Jwt.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({
        status: 403,
        error: 'Authorization fail! Invalid token',
      });
    }
  }

  static async adminAccess (req, res, next) {
    const { isadmin } = req.user;
    if (isadmin !== true) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized Access!',
      });
    }
    next();
  }
}