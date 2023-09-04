const { createError } = require("../../helpers/createError");

const updateContact = (addSchema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(createError(400, "Missing fields"));
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(createError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = updateContact;
