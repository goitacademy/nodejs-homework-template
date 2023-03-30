const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required().label('Name'),
  email: Joi.string().min(3).max(30).trim().email().required().label('Email'),
  phone: Joi.string().min(6).max(30).trim().required().label('Phone Number'),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().label('Name'),
  email: Joi.string().min(3).max(30).trim().email().label('Email'),
  phone: Joi.string().min(6).max(30).trim().label('Phone Number'),
});

const addContactValidator = (req, res, next) => {
  const { error } = addContactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const missingField = error.details[0].context.key;
    return res.status(400).json({ message: `Missing required '${missingField}' field` });
  }

  next();
};

const updateContactValidator = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const { error } = updateContactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.details[0].message});
  }

  next();
};

module.exports = { addContactValidator, updateContactValidator };