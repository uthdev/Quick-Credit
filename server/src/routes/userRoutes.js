import { Router } from 'express';
import UserController from '../controllers/userController';
import Authenticate from '../middlewares/authenticate';
import AccountValidator from '../middlewares/accountValidation';
import Services from '../middlewares/services';

const { userEmail } = AccountValidator;
const { verifyToken, adminAccess, isSuperAdmin } = Authenticate;
const { userExist } = Services;
const { verifyClient, makeAdmin } = UserController;

const userRoute = new Router();

userRoute.patch('/:userEmail/verify', verifyToken, adminAccess, userEmail, userExist, verifyClient);
userRoute.patch('/:userEmail/upgrade', verifyToken, isSuperAdmin, userEmail, userExist, makeAdmin);

export default userRoute;
