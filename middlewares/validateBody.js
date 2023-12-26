const HTTPError = require("../helpers/HTTPError");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      HTTPError(400, "validation error");
    }
    next()
  };
};
