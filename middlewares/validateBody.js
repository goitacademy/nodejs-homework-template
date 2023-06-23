const { HttpError } = require("../helpers");
const addSchema = require("../schemas/contacts");

const validateBody = (addSchema) => {
  const func = (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
