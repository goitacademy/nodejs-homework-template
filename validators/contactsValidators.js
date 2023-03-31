const Joi = require("joi");

const addSchemaAdd = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
});

const validateAddContact = (req, res, next) => {
  const { error } = addSchemaAdd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  next();
};

const validateUpdContact = (req, res, next) => {
  const { error } = addSchemaAdd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  next(error);
};

module.exports = {
  validateAddContact,
  validateUpdContact,
};
