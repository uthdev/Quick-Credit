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
    email: 'johnjones@email.com',
    password: 'asdf1234'
  },
  nonExistentUser: {
    email: 'alphabets@gmail.com',
    password: 'abcdefgh',
  },
  missingLoginField: {
    email: '',
    password: 'Bradit##',
  },
  wrongPassword: {
    email:'johnjones@email.com',
    password: 'wrongpass'
  }
}

export { usersTestData };