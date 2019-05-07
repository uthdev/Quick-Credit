import { Router } from 'express';
import userController from '../controllers/userController';
import AccountValidator from '../middlewares/userValidation';

const userRouter = new Router();
const { signUp, login } = userController;

const { createAccountValidator, loginValidator } = AccountValidator;


userRouter.post('/auth/signup', createAccountValidator, signUp);
userRouter.post('/auth/signin', loginValidator, login)

export default userRouter;
