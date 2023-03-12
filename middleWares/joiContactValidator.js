const Joi = require("joi");

const contactValidator = () => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    phone: Joi.string().min(7).max(15).required(),
    email: Joi.string().email().required(),
  });

  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};

module.exports = contactValidator;
