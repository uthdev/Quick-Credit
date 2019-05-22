import Jwt from '../helpers/jwt';

const errorResponse = async (res) => {
  return res.status(403).json({
    status: 403,
    error: 'Unauthorized Access!',
  });
};

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
      if (error.name === 'TokenExpiredError') {
        return res.status(403).json({
          status: 403,
          error: 'Authorisation failed! Token expired'
        })
      }
      return res.status(403).json({
        status: 403,
        error: `Authorization fail! ${error.message}`,
      });
    }
  }

  static async adminAccess (req, res, next) {
    const { isadmin } = req.user;
    if (isadmin !== true) {
      await errorResponse(res);
    }
    next();
  }

  static async nonAdminAccess (req, res, next) {
    const { isadmin } = req.user;
    if (isadmin) {
      await errorResponse(res);
    } 
    next(); 
  } 

  static async isVerified(req, res, next) {
    const { status } = req.user;
    if ( status !== 'verified' ) {
      return res.status(403).json({
        status: 403,
        error: 'You must be verified to be able to apply'
      });
    } 
    next();
  }
}