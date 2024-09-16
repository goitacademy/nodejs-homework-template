const HttpError = require("../helper/HttpError");

const validateBody = (contactSchema) => {
  const func = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    console.log(contactSchema.validate(req.body));
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;
