const { RequestError } = require("../helpers")

const messages = {
  addContact: "missing required name field",
  updateContact: "missing fields",
  updateFavorite: "missing field favorite",
}

const validateBody = (schema, message) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, message);
    }
    next()
  }
  return func;
}

module.exports = {
  validateBody,
  messages,
};