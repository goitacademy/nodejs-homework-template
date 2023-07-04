const HttpError = require('../helpers/HttpError');

const validateBody = (schema, keys) => {
  const func = (req, res, next) => {
    if (!keys?.length) {
      const isBodyEmpty = !Object.keys(req.body).length;

      if (isBodyEmpty) {
        return res.status(400).json({ message: 'missing fields' });
      }
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
