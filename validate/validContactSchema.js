const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(4).max(20).required(),
});

const validContactSchema = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};
module.exports = validContactSchema;
