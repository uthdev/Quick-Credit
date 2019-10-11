export const successResponse = (res, statusCode, data) => res.status(statusCode).json({
  status: statusCode,
  data,
});

export const errorResponse = (res, errorCode, errorMessage) => res.status(errorCode).json({
  status: errorCode,
  error: errorMessage,
});

export const calculatePaidAmount = (balance, monthlyInstallment, amount) => {
  const newBalance = balance - monthlyInstallment;
  const totalPayable = amount + (amount * 0.05);
  const paidAmount = totalPayable - newBalance;
  return {
    paidAmount,
    newBalance
  };
};
