const schemas = require("../controllers/contacts/validationSchema/contacts");
const { HttpError } = require("../helpers");

// Create a new contact validator
const addValidator = (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

// Update contact validator
const updateValidator = (req, res, next) => {
  const { error } = schemas.updateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = {
  addValidator,
  updateValidator,
};
