import { Router } from 'express';
import LoanController from '../controllers/loanController';
import Access from '../middlewares/access';
import ParamsValidator from '../middlewares/paramsValidator';
import QueryValidator from '../middlewares/queryValidator'

const { verifyToken, adminAccess } = Access;
const { loanId } = ParamsValidator;
const { validateQuery } = QueryValidator

const { getAll, getSpecificLoan, currentRepaid } = LoanController;

const loanRoute = new Router();

loanRoute.get('/', verifyToken, adminAccess, getAll, validateQuery, currentRepaid);
loanRoute.get('/:loanId', verifyToken, adminAccess, loanId, getSpecificLoan);


export default loanRoute;