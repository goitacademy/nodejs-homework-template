const {
  addSchemaSettings,
  updateSchemaSettings,
} = require("../schemas/contacts");
const { RequestError } = require("../helpers");

const addSchema = (req, res, next) => {
  const { error } = addSchemaSettings.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }
  next();
};

const updateSchema = (req, res, next) => {
  const { error } = updateSchemaSettings.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }
  next();
};

module.exports = { addSchema, updateSchema };
