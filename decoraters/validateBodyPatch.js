const HttpError = require('../helpers/HttpError');

const validateBodyPatch = (schema) => {
  const func = (req, res, next) => {
    const isBodyEmpty = !Object.keys(req.body).length;

    if (isBodyEmpty) {
      return res.status(400).json({ message: 'missing field favorite' });
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
  validateBodyPatch,
};
