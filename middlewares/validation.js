const { contactSchema } = require("../shema");

const validation = (contactSchema) => {
  return (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validation;
