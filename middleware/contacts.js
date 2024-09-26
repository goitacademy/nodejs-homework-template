const HttpError = require("../helpers/HttpError");

const validateNewContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
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

const validateUpdatedContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
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

module.exports = { validateNewContact, validateUpdatedContact };