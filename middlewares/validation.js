const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(4).max(100).required().email(),
    phone: Joi.string()
      .min(4)
      .max(20)
      .required()
      .pattern(/^(\+3|)[0-9]{10,11}$/),
  })

const addContactValidation = (req, res, next) => {
  console.log(req.body);
  console.log(`validation` ,req);
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  next();
};

const updateContactValidation = (req, res, next) => {  
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = { addContactValidation, updateContactValidation };
