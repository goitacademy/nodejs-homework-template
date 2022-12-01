const createError = require('http-errors');

const contactValidation = schema => {
  return (req, res, next) => {
    const newContact = req.body;

    const { error } = schema.validate(newContact);

    if (error) {
      throw new createError.BadRequest(error.message);
    }
    next();
  };
};

module.exports = contactValidation;
