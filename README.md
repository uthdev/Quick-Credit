# Quick-Credit
Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

[![Build Status](https://travis-ci.org/uthdev/Quick-Credit.svg?branch=develop)](https://travis-ci.org/uthdev/Quick-Credit)
[![Coverage Status](https://coveralls.io/repos/github/uthdev/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/uthdev/Quick-Credit?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/636a4619429e143194d9/maintainability)](https://codeclimate.com/github/uthdev/Quick-Credit/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/636a4619429e143194d9/test_coverage)](https://codeclimate.com/github/uthdev/Quick-Credit/test_coverage)


---
## Features
- User (client) can sign up.
- User (client) can login.
- User (client) can request for only one loan at a time.
- User (client) can view loan repayment history, to keep track of his/her liability or responsibilities.
- Admin can mark a client as verified , after confirming his/her home and work address.
- Admin can view a specific loan application.
- Admin can approve or reject a client’s loan application.
- Admin can post loan repayment transaction in favour of a client.
- Admin can view all loan applications.
- Admin can view all current loans (not fully repaid).
- Admin can view all repaid loans.
- User can reset password.
- Real time email notification upon approval or rejection of a loan request.


---
## Management
The project development is managed on [Pivotal tracker] https://www.pivotaltracker.com/n/projects/2326976


---
## Frontend
The UI is hosted on [Github pages] https://uthdev.github.io/Quick-Credit/UI/


---
## Backend
The api is hosted on [Heroku] https://money-now.herokuapp.com/api/v1/


---
## Technologies Used
- [Node.js] 
- [Express.js]
- [ESLint]


---
## Testing Tools
- [Mocha]
- [Chai]
- [NYC]
- [Postman]


---
## API Information
The API is hosted on [Heroku] https://money-now.herokuapp.com/api/v1/


METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/api/v1`
POST   | loan        | Create a loan application      |`/api/v1/loans`
PATCH  | loan        | Approve/Reject loan application|`/api/v1/loans/:loanId`
GET    | loan        | Get a specific loan application|`/api/v1/loans/:loanId`
GET    | loan        | Get all loans                  |`/api/v1/loans/`
GET    | loan        | Get all repaid loans           |`/api/v1/loans?status=approved&repaid=true`
GET    | loan        | Get all current(unrepaid) loans|`/api/v1/loans?status=approved&repaid=false`
GET    | loan        | Get loan repayment history     |`/api/v1/loans/:loanId/repayments`
POST   | loan        | Create a repayment transaction |`/api/v1/loans/:loanId/repayment`
POST   | User        | User signup                    |`/api/v1/auth/signup`
POST   | User        | User signin                    |`/api/v1/auth/signin`
PATCH  | User        | verify a user account          |`/api/v1/user/:userEmail/verify`


---
#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/Quick-Credit.git`


#### Setup

- Installing the project's dependencies:

> run the command below

```shell
$ npm install
```

> To start the server, run the command below

```shell
$ npm start
```


---
## Test
- To test the app

> run test using the command below

```shell
$ npm run test
```


---
## Acknowledgements

Andela

---
## Author

Adeleke Gbolahan Uthman
