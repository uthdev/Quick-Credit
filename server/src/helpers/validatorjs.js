import Validator from 'validatorjs';
import customErrorMsgs from './customErrorMsgs';

export const validate = async (res, next, data,  properties) => {
  const validator = new Validator(data, properties, customErrorMsgs);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    });
}