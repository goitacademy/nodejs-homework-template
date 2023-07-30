const { HttpError } = require("../helpers");

const validateBody = (addSchema) => {
  const funct = async (req, res, next) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return funct;
};

module.exports = validateBody;
