const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const objectBody = Object.values(error._original);
      const missingField = error.details[0].context.key;

      objectBody.length === 0 && missingField === "favorite"
        ? next(HttpError(400, `missing fields ${missingField}`))
        : objectBody.length === 0
        ? next(HttpError(400, `missing fields`))
        : next(HttpError(400, `missing required ${missingField} field`));
    }
    next();
  };
  return validate;
};

module.exports = validateBody;
