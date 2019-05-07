import { Router } from 'express';
import AuthController from '../controllers/authController';
import AccountValidator from '../middlewares/accountValidation';

const authRoute = new Router();
const { signUp, login } = AuthController;

const { createAccountValidator, loginValidator } = AccountValidator;


authRoute.post('/auth/signup', createAccountValidator, signUp);
authRoute.post('/auth/signin', loginValidator, login);

export default authRoute;
