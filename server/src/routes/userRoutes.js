import { Router } from 'express';
import UserController from '../controllers/userController';
import Access from '../middlewares/access';
import ParamsValidator from '../middlewares/paramsValidator';

const { verifyToken, adminAccess } = Access;
const { userEmail } = ParamsValidator;

const userRoute = new Router();

const { verifyClient } = UserController;

userRoute.patch('/:userEmail/verify', verifyToken, adminAccess, userEmail, verifyClient);

export default userRoute;
