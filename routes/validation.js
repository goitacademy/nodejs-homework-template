const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ValidContactName } = require("../config/constant");

const reqexEmail = /^\S+@\S+\.\S+$/;
const reqexPhoneNumber =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const schemaContact = Joi.object({
  name: Joi.string().min(ValidContactName.MIN_NAME_LENGTH).required(),
  email: Joi.string().pattern(new RegExp(reqexEmail)).required(),
  phone: Joi.string().pattern(new RegExp(reqexPhoneNumber)).required(),
  favorite: Joi.boolean().optional(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(ValidContactName.MIN_NAME_LENGTH).optional(),
  email: Joi.string().pattern(new RegExp(reqexEmail)).optional(),
  phone: Joi.string().pattern(new RegExp(reqexPhoneNumber)).optional(),
  favorite: Joi.boolean().optional(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId().required(),
});

const schemaFavoriteStatus = Joi.object({
  favorite: Joi.boolean().required(),
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

module.exports.validateUpdateContact = async (req, res, next) => {
  return await validate(schemaUpdateContact, req.body, res, next);
};
module.exports.validateFavoriteStatus = async (req, res, next) => {
  return await validate(schemaFavoriteStatus, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
