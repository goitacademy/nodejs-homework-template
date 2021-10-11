const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const schema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z0-9_ ]*$")),
  phone: Joi.string().alphanum().min(10).max(17).required(),
  favorite: Joi.boolean(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const validate = async (schema, object, res, next) => {
  try {
    await schema.validateAsync(object);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: err.message.replace(/"/g, ""),
    });
  }
};

const schemaId = Joi.object({
  id: Joi.objectId().required(),
});

module.exports.validateContacts = async (req, res, next) => {
  return await validate(schema, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
