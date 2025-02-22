const HttpError = require("./HttpError");
const Joi = require("joi");

const validateContactUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    favorite: Joi.boolean(),
  });

  return schema.validate(data);
};

const checkRequestValidateBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, "Missing field favorite"));
  }
  const { error } = validateContactUpdate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }

  next();
};

module.exports = checkRequestValidateBody;
