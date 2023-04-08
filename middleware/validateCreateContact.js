const HttpError = require("../helpers/HttpError");
const { schemaCreateContact } = require("../models/contact");

const validateCreateContact = (req, res, next) => {
  const { error } = schemaCreateContact.validate(req.body);
  if (error) {
    const type = error.details[0].type;
    if (type === "any.required") {
      const key = error.details[0].context.key;

      return res.status(400).json({ message: `missing required ${key} field` });
    }
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateCreateContact;
