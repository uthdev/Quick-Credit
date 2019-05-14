class Loan {
  constructor(id, user, tenor, amount) {
    this.id = id;
    this.user = user;
    this.createdOn = new Date(Date.now());
    this.status = 'pending';
    this.repaid = false;
    this.tenor = tenor;
    this.amount = amount;
    this.paymentInstallment = (amount + (0.05 * amount)) / tenor;
    this.balance = 0.00;
    this.interest = 0.05 * amount;
  }
}

export default Loan;
