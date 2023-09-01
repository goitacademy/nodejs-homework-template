const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    const emptyBody = Object.keys(req.body);
    if (!emptyBody.length) {
      return HttpError(400, `missing fields`);
    }
    if (error) {
      const missingFieldName = error.details[0].message;

      return HttpError(400, missingFieldName);
    }
  };

  return func;
};

module.exports = validateBody;
