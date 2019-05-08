class Data {
  constructor() {
    this.users = [{
      id: 1,
      email: 'woleadaabale@gmail.com',
      firstname: 'Wole',
      lastname: 'Adaabale',
      password: '$2a$10$CZtWelF1z/DkjLsaM7xL.OdJTs4iRZndUagoUnje2I1ZjyBy1X.Ie',
      address: 'sw1/219, isale Osi, Ibadan',
      status: 'verified',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'tombraddy@yahoo.com',
      firstname: 'Tom',
      lastname: 'Braddy',
      password: 'Bradit##',
      address: 'I7, oshodi-isale, lagos',
      status: 'verified',
      isAdmin: false,
    }, {
      id: 3,
      email: 'nasirhassan04@gmail.com',
      firstname: 'Hassan',
      lastname: 'Nasir',
      password: 'Nassan@',
      address: '23, opp Total filling station, Bida, Niger State',
      status: 'unverified',
      isAdmin: false,
    }, {
      id: 4,
      email: 'ezenwachi@gmail.com',
      firstname: 'chima',
      lastname: 'Ezenwa',
      password: 'Ezechi4dgirls',
      address: '4, umuagu village, Umuaya',
      status: 'verified',
      isAdmin: false,
    }];
    this.loans = [{
      id: 1,
      user: 'ezenwachi@gmail.com',
      createdOn: '2019-05-08',
      status: 'pending',
      repaid: false,
      tenor: 10,
      amount: 500000.00,
      paymentInstallment: 52500.00,
      balance: 0.00,
      interest: 25000.00,
    },{
      id: 2,
      user: 'tombraddy@yahoo.com',
      createdOn: '2018-02-20',
      status: 'approved',
      repaid: true,
      tenor: 10,
      amount: 1000000.00,
      paymentInstallment: 105000.00,
      balance: 0.00,
      interest: 50000.00,
    },{
      id: 3,
      user: 'nasirhassan04@gmail.com',
      createdOn: '2018-12-31',
      status: 'rejected',
      repaid: false,
      tenor: 1,
      amount: 2000000.00,
      paymentInstallment: 2200000.00,
      balance: 0.00,
      interest: 200000.00,
    },{
      id: 4,
      user: 'tombraddy@yahoo.com',
      createdOn: '2019-03-02',
      status: 'approved',
      repaid: false,
      tenor: 10,
      amount: 1500000.00,
      paymentInstallment: 157500.00,
      balance: 1260000.00,
      interest: 75000.00
    }]
  }
}

const data = new Data();

export default data;
