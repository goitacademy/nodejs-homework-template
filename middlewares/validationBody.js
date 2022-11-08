const { requestError } = require("../helpers/api.helpers");

const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error.details[0].type === "any.required") {
        return next(
          requestError(400, `missing required ${error.details[0].path} field`)
        );
      }
      if (error.details[0].type === "object.min") {
        return next(requestError(400, "missing fields"));
      }
      if (error.details[0].type === "boolean.base") {
        return next(requestError(400, "favorite must be a boolean"));
      }
      return next(error);
    }
  };
};

module.exports = { validationBody };
