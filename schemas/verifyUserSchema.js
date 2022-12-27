const Joi = require("joi");

const verifyUserSchema = (param) => {
  if (param === "verificationToken") {
    return Joi.object({
      verificationToken: Joi.string().required(),
    });
  }
  if (param === "email") {
    return Joi.object({
      email: Joi.string().required(),
    });
  }
};

module.exports = { verifyUserSchema };
