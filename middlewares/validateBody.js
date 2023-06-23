const contactsSchema = require("../schemas/contacts");
const { HttpError } = require("../helpers");

function validateBody(schema) {
  const func = async (req, res, next) => {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
}

module.exports = validateBody;
