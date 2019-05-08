import { Router } from 'express';
import LoanController from '../controllers/loanController';
import Access from '../middlewares/access';

const { verifyToken, adminAccess } = Access;

const { getAll } = LoanController;

const loanRoute = new Router();

loanRoute.get('/', verifyToken, adminAccess, getAll);

export default loanRoute;