const Joi = require("joi");

const contactSchema = Joi.object({
  _id: Joi.string().optional(),
  name: Joi.string()
    .required()
    .min(3)
    .pattern(new RegExp("^[A-Z][a-z]+ [A-Z][a-z]+$")),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .required()
    .min(9)
    .pattern(/^[0-9]+(?:[-\s]?[0-9]+)*$/),
  favorite: Joi.boolean().optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  _v: Joi.number().optional(),
  owner: Joi.string().required(),
});

const contactValidationMiddleware = (req, res, next) => {
  const newContact = req.body;

  const { error } = contactSchema.validate(newContact);

  if (error) {
    console.log("Data not valid");
    return res.status(400).send({ error: error.message });
  }
  console.log("data OK");

  return next();
};

module.exports = {
  contactValidationMiddleware,
};
