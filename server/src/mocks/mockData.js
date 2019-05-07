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
  }
}

const data = new Data();

export default data;
