const { schemas } = require("../models/contact");
const { HttpError } = require("../helpers");

const validateAddContact = (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

const validateUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");

  const { error } = schemas.addSchemaUpd.validate(req.body, {
    abortEarly: false,
  });
  if (error) throw HttpError(400, error.details[0].message);

  next();
};

const validateUpdStatusContact = (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) throw HttpError(400, "Missing field favorite");
  next();
};

module.exports = {
  validateAddContact,
  validateUpdContact,
  validateUpdStatusContact,
};
