import createError from 'http-errors';

export const validateBody = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    next(new createError(400, error.message));
  }

  next();
};
