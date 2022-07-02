const getError = require("../helpers/error");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, {
      presence: "required",
    });
    if (error) {
      throw getError(
        400,
        error.details[0].type === "any.required"
          ? `missing required ${error.details[0].path[0]} field`
          : error.message
      );
    }
    next();
  };
  return func;
};

module.exports = validation;
