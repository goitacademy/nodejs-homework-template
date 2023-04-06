const Joi = require("joi");

const {HTTPError} = require("../helpers/controller-helpers");


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

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).options({ allowUnknown: true });

const addContactValidator = (req, res, next) => {
  const { error } = addContactSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const missingField = error.details[0].context.key;
    throw HTTPError(400, `Missing required '${missingField}' field`);
  }

  next();
};

const updateContactValidator = (req, res, next) => {
  if (!Object.keys(req.body).length) throw HTTPError(400, "Missing fields");

  const { error } = updateContactSchema.validate(req.body, { abortEarly: false });

  if (error) throw HTTPError(400, error.details[0].message);

  next();
};


const updateStatusValidator = (req, _, next) => {
  const {error} = updateStatusSchema.validate(req.body);

  if (error) throw HTTPError(400, "missing field favorite");

  next();
};

module.exports = { addContactValidator, updateContactValidator, updateStatusValidator };
