import Validator from 'validatorjs';
import { errorResponse } from './functions';
import customErrorMsgs from './customErrorMsgs';

const validate = async (res, next, data, properties) => {
  const validator = new Validator(data, properties, customErrorMsgs);
  validator.passes(() => next());
  validator.fails(() => {
    const errors = validator.errors.all();
    return errorResponse(res, 400, errors);
  });
};

export default validate;
