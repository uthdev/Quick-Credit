import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { authTestData } from './testData';

chai.use(chaiHttp);

const { expect } = chai;
const { adminUser, existingUserSignIn } = authTestData;

let adminToken;
let userToken;

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
  })
})