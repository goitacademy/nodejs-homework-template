const Joi = require("joi");

const reqexEmail = /^\S+@\S+\.\S+$/;
const reqexPhoneNumber =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
// /^(?:\+\s?\d{1,2}\s?)?(?:\(\d{1,4}\)|\d{1,4})?\s?\d+([\-\s/.]?)(?:\d\1?)+(?<=^(?:\D?\d\D?){5,14})\d$/;

const schemaContact = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string().pattern(new RegExp(reqexEmail)).required(),
  phone: Joi.string().pattern(new RegExp(reqexPhoneNumber)).required(),
  favorite: Joi.boolean().optional(),
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
