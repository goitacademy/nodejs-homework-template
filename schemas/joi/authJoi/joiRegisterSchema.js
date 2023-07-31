const Joi = require("joi");
const emailRegexp = require("../../../services");

const joiRegisterSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .error(new Error("Помилка від Joi або іншої бібліотеки валідації")),
  password: Joi.string()
    .min(6)
    .required()
    .error(new Error("Помилка від Joi або іншої бібліотеки валідації")),
});

module.exports = joiRegisterSchema;
