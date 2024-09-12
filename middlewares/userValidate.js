const { HttpError } = require("../helpers");
const { schema } = require("../utils/validation/userSchemaValidation");

const userValidate = (req, res, next) => {
  const { error } = schema.addUserSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "Invalid request");
  }
  next();
};

module.exports = { userValidate };
