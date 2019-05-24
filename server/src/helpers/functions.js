import User from '../models/userModel';
import Loan from '../models/loanModel';

export const loanFinder = async (loanId, res) => {
  try {
    const rows = await Loan.findLoanById(loanId);
    if(rows.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: `Loan application with id: ${loanId} not found`,
      });
    } 
  return rows[0];
  } catch (error) {
    return error;
  } 
}

export const userFinder = async (res, email) => { 
  try {
    const rows = await User.findUserByEmail(email);
    if(rows.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      })
    } 
    return rows[0];
  } catch (error) {
    return error;
  }
}

export const userUpdator = async (userEmail ,columnToUpdate, updateValue) => {
  try {
    const updatedRows = await User.updateUser(userEmail, columnToUpdate, updateValue);
    return updatedRows[0];   
  } catch (error) {
    return error;
  }
}