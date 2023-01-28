const RequestError = require("../helpers/RequestError");

const validate = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error.details[0];
      next(RequestError(400, { message: message }));
    }
    next();
  };
};

module.exports = { validate };
