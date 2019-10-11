import { Router } from 'express';
import LoanController from '../controllers/loanController';
import Authenticate from '../middlewares/authenticate';
import LoanValidator from '../middlewares/loansValidator';
import Services from '../middlewares/services';

const { loanExist } = Services;
const {
  verifyToken, adminAccess, nonAdminAccess, isVerified
} = Authenticate;
const {
  loanApplicationValidator, loanId, filterQuery
} = LoanValidator;
const {
  getAll, getSpecificLoan, currentRepaid,
  approveLoan, rejectLoan, createLoanApplication,
  createRepaymentTransaction, getRepaymentHistory,
} = LoanController;

const loanRoute = new Router();

loanRoute.get('/', verifyToken, adminAccess, getAll, filterQuery, currentRepaid);
loanRoute.get('/:loanId', verifyToken, adminAccess, loanId, loanExist, getSpecificLoan);
loanRoute.get('/:loanId/repayments', verifyToken, loanId, loanExist, getRepaymentHistory);
loanRoute.patch('/:loanId/approve', verifyToken, adminAccess, loanId, loanExist, approveLoan);
loanRoute.patch('/:loanId/reject', verifyToken, adminAccess, loanId, loanExist, rejectLoan);
loanRoute.post('/', verifyToken, nonAdminAccess, isVerified, loanApplicationValidator, createLoanApplication);
loanRoute.post('/:loanId/repayments', verifyToken, adminAccess, loanId, loanExist, createRepaymentTransaction);

export default loanRoute;
