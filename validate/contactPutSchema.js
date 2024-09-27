const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const contactPutSchema = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = contactPutSchema;
