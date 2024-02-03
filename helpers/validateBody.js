const { HttpError } = require('../helpers/HttpError');
const {
  schemas,
} = require('../models/contact');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error && schema === schemas.createContactSchema) {
      throw HttpError(400, error.message);
    } else if (error && schema === schemas.updateContactSchema) {
      throw HttpError(400, 'Body must have at least one field');
    }

    next();
  };

  return func;
};

module.exports.validateBody = validateBody;
