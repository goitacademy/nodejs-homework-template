const ReqError = require("../help/ReqError");

const validate = (schema) => {
  return (request, response, next) => {
    const { error } = schema.validate(request.body);

    if (error) {
      const { message } = error.details[0];
      next(ReqError(400, { message: message }));
    }
    next();
  };
};

module.exports = { validate };
