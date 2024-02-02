const { HttpError } = require('../helpers');
const {
  createContactSchema,
  updateContactSchema,
} = require('../schemas/contactsSchemas');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error && schema == createContactSchema) {
      throw HttpError(400, error.message);
    } else if (error && schema == updateContactSchema) {
      throw HttpError(400, 'Body must have at least one field');
    }

    next();
  };

  return func;
};

module.exports = validateBody;
