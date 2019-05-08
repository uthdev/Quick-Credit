// user
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
    email: 'woleadaabale@gmail.com',
    password: 'wolebale',
  }
};

const userTestData = {
  unverifiedExisting: 'tombraddy@yahoo.com',
  wrongEmail: 'dattebayo.com',
  nonExistingUser: 'alphabets@gmail.com',
};

const loanTestData = {
  invalidLoanId: 'cat',
  invalidQueryParams: 'status=rejected&repaid=true',
  validApproveLoan: {
    status: 'approved'
  },
  validRejectLoan: {
    status: 'rejected'
  },
  invalidApproveLoan: {
    status: 'unapproved'
  }
}
export { authTestData, userTestData, loanTestData };
