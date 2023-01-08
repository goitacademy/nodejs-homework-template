const { HttpError } = require("../helpers");

const { updateFavoriteSchema } = require("../schemas");

const validateUpdateBody = (req, res, next) => {
  const newContact = req.body;
  const { error } = updateFavoriteSchema.validate(newContact);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateUpdateBody;
