// const Joi = require("joi");

const { schemas } = require("../models/contact");

// const addSchemaAdd = Joi.object({
//   name: Joi.string().trim().required(),
//   email: Joi.string().trim().email().required(),
//   phone: Joi.string().trim().required(),
// });

// const addSchemaUpd = Joi.object({
//   name: Joi.string().trim(),
//   email: Joi.string().trim().email(),
//   phone: Joi.string().trim(),
// });

const validateAddContact = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });
  const { error } = schemas.addSchemaAdd.validate(req.body);

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

const validateUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const { error } = schemas.addSchemaUpd.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateAddContact,
  validateUpdContact,
};
