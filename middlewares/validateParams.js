const { setApiErrorStatus } = require("../helpers");

const validateParams = (schema) => {
  const func = (req, _, next) => {
    const {
      params: { contactId },
    } = req;

    const { error } = schema.validate(
      { _id: contactId },
      { abortEarly: false }
    );

    if (error) {
      next(setApiErrorStatus(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateParams;