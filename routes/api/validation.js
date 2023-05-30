const Joi = require("joi");
const { HttpError } = require("../../helpers");

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
});

const validateData = (req, res, next) => {
  const checkBody = Object.keys(req.body).length;
  if (checkBody === 0) {
    throw HttpError(400, "missing fields");
  }
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateData;
