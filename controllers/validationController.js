const Joi = require("joi");

function validateContactId(req, res, next) {
  const { contactId } = req.params;

  const schema = Joi.string().length(24).hex().required();

  const { error } = schema.validate(contactId);

  if (error) {
    console.error("Joi validation error:", error);
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  next();
}

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
  }),
});

module.exports = {
  contactSchema,
  favoriteSchema,
  validateContactId,
};
