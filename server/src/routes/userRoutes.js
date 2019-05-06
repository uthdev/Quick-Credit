import { Router } from 'express';
import userController from '../controllers/userController';
import AccountValidator from '../middlewares/userValidation';

const userRouter = new Router();
const { signUp } = userController;

const { createAccountValidator } = AccountValidator;


userRouter.post('/auth/signup', createAccountValidator, signUp);

export default userRouter;
