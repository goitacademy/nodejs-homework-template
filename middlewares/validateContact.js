const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

const validateContact = (req, res, next) => {
  console.log("Dane do walidacji:", req.body);
  console.log("name:", req.body.name);
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateContact,
  contactSchema,
};
