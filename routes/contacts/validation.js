const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { StatusCode, ValidLengthName } = require("../../config/constants");

const BAD_REQUEST = StatusCode.BAD_REQUEST;
const MIN_LENGTH_NAME = ValidLengthName.MIN_LENGTH_NAME;
const MAX_LENGTH_NAME = ValidLengthName.MAX_LENGTH_NAME;

const schemaContact = Joi.object({
  name: Joi.string().min(MIN_LENGTH_NAME).max(MAX_LENGTH_NAME).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s?\d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaContactId = Joi.object({
  contactId: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(BAD_REQUEST).json({
      status: "error",
      code: BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}!`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateContactStatus = async (req, res, next) => {
  return await validate(schemaContactStatus, req.body, res, next);
};

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next);
};