import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { userTestData, authTestData } from './testData';

chai.use(chaiHttp);

const { expect, assert } = chai;

const { 
  adminUser, unverifiedExisting, wrongEmail, nonExistingUser
} = userTestData;

const { validUserAccount, existingUserSignIn } = authTestData;

let adminToken;
let userToken;
describe('AUTH TEST', () => {
  it('should respond with status code 200 if user exist', async () => {
    const user = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(existingUserSignIn);
    expect(user).to.have.status(200);
    expect(user.body).to.have.property('data');

    userToken = user.body.data.token;

    const admin = await chai.request(app)
    .post('/api/v1/auth/signin')
    .send(adminUser);
    expect(admin).to.have.status(200);
    expect(admin.body).to.have.property('data');

    adminToken = admin.body.data.token;
  
  });
});

describe('USERS TEST DATA', () => {
  describe('VERIFY A CLIENT', () => {
    it('should return a status 401 error if no token is provided', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${unverifiedExisting}/verify`)
      .set('Accept', 'application/json')
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
      console.log('show?');
    });
    it('should return a status 403 error if user is not logged or wrong token is provided', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${unverifiedExisting}/verify`)
      .set('x-access-token', 'not logged in.')
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 403 error if user is not Admin', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${unverifiedExisting}/verify`)
      .set('x-access-token', userToken)
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 400 error if user is Admin but params validation fails', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${wrongEmail}/verify`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 404 error if user does not exist', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${nonExistingUser}/verify`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });
    it('should return a status 200 success if user exist and validation passes', async () => {
      const res = await chai.request(app)
      .patch(`/api/v1/users/${unverifiedExisting}/verify`)
      .set('x-access-token', adminToken)
      expect(res).to.have.status(200);
      expect(res.body.data.status).to.be.equal('verified');
    });
  })
})