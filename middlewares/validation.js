const { joiSchema } = require("../model/contact");

const validation = (joiSchema) => {
  return (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
