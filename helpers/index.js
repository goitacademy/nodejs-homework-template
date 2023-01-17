const Joi = require("joi");

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
};

const validationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().required(),
});

module.exports = {
    HttpError,
    validationSchema
};