import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { usersTestData } from './testData';

chai.use(chaiHttp);

const { expect, assert } = chai;

// import { validUserAccount, invalidUserAccount, existingUserSignUp } from './testData';
const { 
  validUserAccount, invalidUserAccount, existingUserSignIn, nonExistentUser, missingLoginField, wrongPassword
} = usersTestData;

describe('USER TEST', () => {
  describe('User SignUp', () => {
    it('should respond with status code 201 and create a user account', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUserAccount);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
    it('should respond with status code 409 if account already exists', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUserAccount);
      expect(res).to.have.status(409);
      expect(res.body.message).equal('This email address is already taken');
    });
    it('should respond with status code 400 for invalid account signUp details', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidUserAccount);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('USER SIGNIN', () => {
    it('should respond with status code 200 if user exist', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(existingUserSignIn);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with status code 404 if user does not exist', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonExistentUser);
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object')
      expect(res.body.message).to.equal('User does not exist');
    });
    it('should respond with status code 400 if field is empty', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(missingLoginField);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
    it('should respond with status code 400 if password is incorrect', async () => {
      const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(missingLoginField);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  })
})