const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

const validateBody = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: `${error.message} field` });
    } else {
      next();
    }
  };

module.exports = validateBody;
