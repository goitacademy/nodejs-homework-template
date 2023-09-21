import { ErrorStatus } from '../constants/index.js';

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(ErrorStatus(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;