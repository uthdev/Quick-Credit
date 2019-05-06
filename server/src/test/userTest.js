import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { usersTestData } from './testData';

chai.use(chaiHttp);

const { expect, assert } = chai;

// import { validUserAccount, invalidUserAccount, existingUserSignUp } from './testData';
const { validUserAccount, invalidUserAccount, existingUserSignUp } = usersTestData;

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
})