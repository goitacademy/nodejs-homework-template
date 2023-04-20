const { HttpError } = require("../helpers");

const validateBodyPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const namesFields = ["name", "email", "phone"];
    const requiredField = namesFields.filter(
      (field) => req.body[field] === undefined
    );

    if (error) {
      next(HttpError(400, `missing required ${requiredField} field`));
    }

    next();
  };
  return func;
};

module.exports = validateBodyPost;
