const { handleMongooseError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { body } = req;

    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
      next(handleMongooseError(error, _, next));
    }

    next();
  };

  return func;
};

module.exports = validateBody;