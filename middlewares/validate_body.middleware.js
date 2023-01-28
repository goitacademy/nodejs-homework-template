const { create_http_exception } = require("../helpers");

const validate_body = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(create_http_exception(400, error.message));
    }

    next();
  };

  return fn;
};

module.exports = {
  validate_body,
};
