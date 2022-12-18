const { setApiErrorStatus } = require("../helpers");

const validationBody = (schema) => {
  const func = (req, _, next) => {
    const { body } = req;

    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
      next(setApiErrorStatus(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validationBody;
