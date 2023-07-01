const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!Object.keys(req.body).length) {
      throw HttpError(
        400,
        req.route.methods.patch ? `missing field favorite` : `missing fields`
      );
    }
    if (error) {
      const requiredField = error.message
        .replace(`"`, "")
        .replace('" is required', "");
      throw HttpError(400, `missing required ${requiredField} field`);
    }
    next();
  };
  return func;
};

module.exports = { validateBody };
