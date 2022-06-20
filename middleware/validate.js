const Joi = require("joi");

const postValidate = (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(15).required(),
  });

  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const updateValidate = (req, res, next) => {
  const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().min(4).max(30).email(),
    phone: Joi.string().min(6).max(15),
  });

  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

module.exports = {
  postValidate,
  updateValidate,
};
