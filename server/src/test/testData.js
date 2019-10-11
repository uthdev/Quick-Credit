const authTestData = {
  validUserAccount: {
    firstname: 'john',
    lastname: 'Jones',
    email: 'johnjones@email.com',
    password: 'asdf1234',
    address: '12, west boulevard, Los Angeles, CA',
  },
  invalidUserAccoun: {
    firstname: 'john',
    lastname: '',
    email: 'johnjones@email.com',
    password: 'asdf1234',
    address: '12, west boulevard, Los Angeles, CA',
  },
  existingUserSignIn: {
    email: 'johnjones@email.com',
    password: 'asdf1234',
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
    email: 'johnjones@email.com',
    password: 'wrongpass',
  },
  adminUser: {
    email: 'adelekegbolahan92@yahoo.com',
    password: 'jackJones92',
  },
  hasUnrepaidLoanUser: {
    email: 'tombraddy@yahoo.com',
    password: '3eyedRaven',
  },
};

const userTestData = {
  unverifiedExisting: 'johnjones@email.com',
  wrongEmail: 'dattebayo.com',
  nonExistingUser: 'alphabets@gmail.com',
};

const loanTestData = {
  invalidLoanId: 'cat',
  invalidQueryParams: 'status=reject',
  validLoanApplication: {
    tenor: 9,
    amount: 1500000,
  },
  invalidLoanApplication: {
    tenor: '10 years',
    amount: 1000000000,
  },
  verifiedUser: 'johnjones@email.com'
};
export { authTestData, userTestData, loanTestData };
