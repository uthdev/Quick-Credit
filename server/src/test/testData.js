// user
const usersTestData = {
  validUserAccount:  {
    firstname: 'john',
    lastname: 'Jones',
    email: 'johnjones@email.com',
    password: 'asdf1234',
    address: '12, west boulevard, Los Angeles, CA'
  },
  invalidUserAccoun: {
    firstname: 'john',
    lastname: '',
    email: 'johnjones@email.com',
    password: 'asdf1234',
    address: '12, west boulevard, Los Angeles, CA'
  },
  existingUserSignUp: {
    firstname: 'Tom',
    lastname: 'Braddy',
    email: 'tombraddy@yahoo.com',
    password: 'Bradit##',
    address: 'I7, oshodi-isale, lagos'
  }
}

export { usersTestData};