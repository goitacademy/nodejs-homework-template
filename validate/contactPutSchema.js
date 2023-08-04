const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(12),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(20),
});

const contactPutSchema = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = contactPutSchema;
