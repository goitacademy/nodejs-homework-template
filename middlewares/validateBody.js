const { HttpError } = require('../utils');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const errorType = error?.details[0].type;

  if (errorType === 'any.required') {
    const missingField = error.message.split(' ')[0].replaceAll('"', '');
    throw HttpError({
      status: 400,
      message: `missing required ${missingField} field`,
    });
  }

  if (errorType === 'object.length') {
    throw HttpError({
      status: 400,
      message: 'missing fields',
    });
  }
  next();
};

module.exports = validateBody;
