const Joi = require("joi");

const addSchemaAdd = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
});

const addSchemaUpd = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().trim().email(),
  phone: Joi.string().trim(),
});

const validateAddContact = (req, res, next) => {
  const { error } = addSchemaAdd.validate(req.body);
  const missingField = error.details[0].context.key;
  if (error) {
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

const validateUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const { error } = addSchemaUpd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateAddContact,
  validateUpdContact,
};
