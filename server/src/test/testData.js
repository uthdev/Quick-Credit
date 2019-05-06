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
  existingUserSignIn: {
    email: 'tombraddy@yahoo.com',
    password: 'Bradit##'
  },
  nonExistentUser: {
    email: 'xyz@gmail.com',
    password: 'abcdefgh',
  },
  missingLoginField: {
    email: '',
    password: 'Bradit##',
  },
  wrongPassword: {
    email:'johnjones@email.com',
    password: 'asdf4321'
  }
}

export { usersTestData};