import { setErrorResponse } from '../helpers/setResponse.js';

export const validateBody = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(setErrorResponse(400, error.message));
  }

  next();
};
