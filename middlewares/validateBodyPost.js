const { HttpError } = require("../helpers");

const validateBodyPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const namesFields = ["name", "email", "phone"];
    const requiredField = namesFields.filter(
      (field) => req.body[field] === undefined
    );
    const objectFields = namesFields.filter((field) => req.body[field]);

    if (error) {
      if (objectFields.length < 3) {
        next(HttpError(400, `missing required ${requiredField} field`));
      }
      next(HttpError(400, error.message));
    }

    next();
  };
  return func;
};

module.exports = validateBodyPost;
