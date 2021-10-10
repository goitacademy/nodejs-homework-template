const Joi = require("joi");

const patternContact = "^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$";

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternContact)).required(),
});

const patternId = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";

const schemaId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(patternId)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${error.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
