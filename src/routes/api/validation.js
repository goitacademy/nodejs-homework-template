const Joi = require("joi");

const patternPhone =
  "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"; // /^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/ (+380 (**)-***-**-**) or ^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4} or +?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}
const patternId = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  isFavorite: Joi.boolean().optional(),
});

// const schemaUpdateContact = Joi.object({
//   name: Joi.string().min(3).max(30).optional(),
//   email: Joi.string().email().optional(),
//   phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
//   isFavorite: Joi.boolean().optional(),
// }).min(1);

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().required(),
});

const schemaId = Joi.object({
  contactId: Joi.string().pattern(new RegExp(patternId)).required(),
});

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

// module.exports.validateUpdateContact = async (req, res, next) => {
//   return await validate(schemaUpdateContact, req.body, res, next);
// };

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
