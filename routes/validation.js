const Joi = require("joi");

const reqexEmail = /^\S+@\S+\.\S+$/;
const reqexPhoneNumber =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string().pattern(new RegExp(reqexEmail)).required(),
  phone: Joi.string().pattern(new RegExp(reqexPhoneNumber)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing or incorrect name field",
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};
