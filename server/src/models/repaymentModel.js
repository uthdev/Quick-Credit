class Repayment {
  constructor(id, loanId, amount, monthlyInstallment) {
    this.id = id;
    this.createdOn = new Date(Date.now());
    this.loanId = loanId;
    this.amount = amount;
    this.monthlyInstallment = monthlyInstallment;
  }
}

export default Repayment;
