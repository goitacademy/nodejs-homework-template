const { HTTPError } = require("../helpers");

const validateFavorite = (schema) => {
  const func = (requirement, response, next) => {
    const { error } = schema.validate(requirement.body);
    if (error) {
      next(HTTPError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};
module.exports = validateFavorite;
