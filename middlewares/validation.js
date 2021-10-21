const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});
const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    return next({
      status: 400,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
  next();
};

const joiSchemaAuth = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

module.exports.validateContact = (req, _res, next) => {
  return validate(joiSchema, req.body, next);
};
module.exports.validateAuth = (req, _res, next) => {
  return validate(joiSchemaAuth, req.body, next);
};
