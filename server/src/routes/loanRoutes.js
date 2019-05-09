import { Router } from 'express';
import LoanController from '../controllers/loanController';
import Access from '../middlewares/access';
import ParamsValidator from '../middlewares/paramsValidator';
import QueryValidator from '../middlewares/queryValidator';
import LoanValidator from '../middlewares/loansValidator';

const { verifyToken, adminAccess } = Access;
const { loanId } = ParamsValidator;
const { validateQuery } = QueryValidator;
const { approveLoanValidator, loanApplicationValidator } = LoanValidator;

const { 
  getAll, getSpecificLoan, currentRepaid, 
  approveRejectLoan, createLoanApplication ,
   createRepaymentTransaction
  } = LoanController;

const loanRoute = new Router();

loanRoute.get('/', verifyToken, adminAccess, getAll, validateQuery, currentRepaid);
loanRoute.get('/:loanId', verifyToken, adminAccess, loanId, getSpecificLoan);
loanRoute.patch('/:loanId', verifyToken, adminAccess, loanId, approveLoanValidator, approveRejectLoan);
loanRoute.post('/', verifyToken, loanApplicationValidator, createLoanApplication);
loanRoute.post('/:loanId/repayment', verifyToken, adminAccess, loanId, createRepaymentTransaction);


export default loanRoute;