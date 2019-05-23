import { Router } from 'express';
import UserController from '../controllers/userController';
import Access from '../middlewares/access';
import ParamsValidator from '../middlewares/paramsValidator';

const { verifyToken, adminAccess, isSuperAdmin } = Access;
const { userEmail } = ParamsValidator;

const userRoute = new Router();

const { verifyClient, makeAdmin } = UserController;

userRoute.patch('/:userEmail/verify', verifyToken, adminAccess, userEmail, verifyClient);
userRoute.patch('/:userEmail/upgrade', verifyToken, isSuperAdmin, userEmail, makeAdmin)

export default userRoute;
