const ReqError = require("../help/ReqError");

const validate = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error.details[0];
      next(ReqError(400, { message: message }));
    }
    next();
  };
};

module.exports = { validate };
