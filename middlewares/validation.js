const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  console.log(`validation` ,req);
  const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(4).max(100).required().email(),
    phone: Joi.string()
      .min(4)
      .max(20)
      .required()
      .pattern(/^(\+3|)[0-9]{10,11}$/),
  });

  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  next();
};

const updateContactValidation = (req, res, next) => {  
  if (req.body === {} || req.body === null || req.body === undefined) {
    return res.status(400).json({message: 'missing fields'})
  }
  
  const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(4).max(100).email(),
    phone: Joi.string()
      .min(4)
      .max(20)
      .pattern(/^(\+3|)[0-9]{10,11}$/),
  });

  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = addContactValidation;
module.exports = updateContactValidation;
