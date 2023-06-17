const HttpError = require('../helpers/HttpError');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const fieldsCompleted = Object.keys(req.body).length;

    if (!fieldsCompleted) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    next();
  };

  return func;
};

module.exports = {
  validateBody,
};
