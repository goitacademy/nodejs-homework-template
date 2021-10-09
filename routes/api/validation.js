const Joi = require("joi");

const patternPhone = "^[(][0-9]{3}[)]\\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}";

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
}).min(1);

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateUpdateContact = async (req, res, next) => {
  return await validate(schemaUpdateContact, req.body, res, next);
};
