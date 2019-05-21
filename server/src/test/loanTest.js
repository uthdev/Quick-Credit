import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { authTestData, loanTestData } from './testData';

chai.use(chaiHttp);

const { expect } = chai;
const { adminUser, existingUserSignIn, hasUnrepaidLoanUser } = authTestData;
const { 
  invalidLoanId, invalidQueryParams, validApproveLoan, 
  validRejectLoan, invalidApproveLoan, 
  validLoanApplication, invalidLoanApplication
} = loanTestData

let adminToken;
let userToken;
let unrepaidLoanUserToken;

describe('AUTH TEST', () => {
  it('Should signin Admin', async () => {
    const admin = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(adminUser)
    expect(admin).to.have.status(200);
    expect(admin.body).to.have.property('data');

    adminToken = admin.body.data.token;

    const user = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(existingUserSignIn);
    expect(user).to.have.status(200);
    expect(user.body).to.have.property('data');

    userToken = user.body.data.token;

    const unRepaidLoanUser = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(hasUnrepaidLoanUser);
    expect(user).to.have.status(200);
    expect(user.body).to.have.property('data');

    unrepaidLoanUserToken = unRepaidLoanUser.body.data.token;
  });
});

describe('LOANS TEST', () => {
  describe('GET ALL LOAN APPLICATIONS', () => {
    it('should return a status 401 error if no token is provided', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans`)
      .set('Accept', 'application/json')
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 403 error if user is not logged or wrong token is provided', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans`)
      .set('x-access-token', 'user not logged in')
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 403 error if user is not Admin', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans`)
      .set('x-access-token', userToken)
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
    // it('should return a status 404 error if no loan application is available', async () => {
    //   const res = await chai.request(app)
    //   .get('/api/v1/loans')
    //   .set('x-access-token', adminToken)
    //   expect(res).to.have.status(404);
    //   expect(res.body).to.have.property('message');
    //   expect(res.body.message).to.be.equal('No loan application available');
    // });
    it('should return a status 200 success code and return all existing loan application', async () => {
      const res = await chai.request(app)
      .get('/api/v1/loans')
      .set('x-access-token', adminToken)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET SPECIFIC LOAN', () => {
    it('should return a status 400 when params validation fails', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans/${invalidLoanId}`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    })

    it('should return a status 200 and return the requested loan application', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans/1`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    })
  })
  
  describe('GET REPAID  AND CURRENT LOANS', () => {
    it('should return a status 200 and return all repaid loans', async () => {
      const res = await chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=true')
      .set('x-access-token', adminToken)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 200 and return all current loans', async () => {
      const res = await chai.request(app)
      .get('/api/v1/loans?status=approved&repaid=false')
      .set('x-access-token', adminToken)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 400 when query validation fails', async () => {
      const res = await chai.request(app)
      .get(`/api/v1/loans?${invalidQueryParams}`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    })
  });

  describe('APPROVE OR REJECT LOAN', () => {
    it('should return status 200 and approve the loan', async () => {
      const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', adminToken)
      .send(validApproveLoan)
      expect(res).to.have.status(200);
      expect(res.body.data.status).to.be.equal('approved');
    })
    it('should return status 200 and reject the loan', async () => {
      const res = await chai.request(app)
      .patch('/api/v1/loans/1')
      .set('x-access-token', adminToken)
      .send(validRejectLoan);
      expect(res).to.have.status(200);
      expect(res.body.data.status).to.be.equal('rejected');
    })
    it('should return a status 400 when request validation fails', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/loans/1`)
      .set('x-access-token', adminToken)
      .send(invalidApproveLoan);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    })

  });

  describe('POST A LOAN APPLICATION', () => {
    it('should return a status 201 code and create a loan application', async () => {
      const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('x-access-token', userToken)
      .send(validLoanApplication);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 400 error code when loan application validation fails', async () => {
      const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('x-access-token', userToken)
      .send(invalidLoanApplication);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 403 error code when user has an unrepaid loan', async () => {
      const res = await chai.request(app)
      .post('/api/v1/loans')
      .set('x-access-token', unrepaidLoanUserToken)
      .send(validLoanApplication);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
    });
  });

  describe('POST A LOAN REPAYMENT TRANSACTION', () => {
    it('should return a status 201 code and create a repayment transaction when no current loan', async() => {
      const res = await chai.request(app)
      .post('/api/v1/loans/4/repayment')
      .set('x-access-token', adminToken)
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
    it('should return a status 403 when loan is paid', async() => {
      const res = await chai.request(app)
      .post('/api/v1/loans/5/repayment')
      .set('x-access-token', adminToken)
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET REPAYMENT HISTORY OF SPECIFIC LOAN', () => {
    it('should return a status 200 code and get all repayment history to a specific loan', async () => {
      const res = await chai.request(app)
      .get('/api/v1/loans/4/repayments')
      .set('x-access-token', unrepaidLoanUserToken);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
  });
});