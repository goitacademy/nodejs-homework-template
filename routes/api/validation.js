const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  emaile: Joi.string().min(1).max(20).required(),
  phone: Joi.number().integer().min(1).max(999999999999).required(),
});

const schemaId = Joi.object({
  contactId: Joi.string().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `Filed ${err.message.replace(/"/g, "")}` });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
