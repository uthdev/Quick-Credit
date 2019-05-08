import { Router } from 'express';
import LoanController from '../controllers/loanController';
import Access from '../middlewares/access';
import ParamsValidator from '../middlewares/paramsValidator';

const { verifyToken, adminAccess } = Access;
const { loanId} = ParamsValidator;

const { getAll, getSpecificLoan } = LoanController;

const loanRoute = new Router();

loanRoute.get('/', verifyToken, adminAccess, getAll);
loanRoute.get('/:loanId', verifyToken, adminAccess, loanId, getSpecificLoan);

export default loanRoute;