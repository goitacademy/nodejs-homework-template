const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    //   favorite: Joi.boolean().required(),
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .regex(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
      .max(15)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  validationSchema(schema, req, res);
  next();
};

const authValidation = (req, res, next) => {
  const schema = Joi.object({
    // eslint-disable-next-line prefer-regex-literals
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    name: Joi.string().min(3).max(30),
  });
  validationSchema(schema, req, res);
  next();
};

const favoriteValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  validationSchema(schema, req, res);
  next();
};

function validationSchema(schema, req, res) {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details,
      message: "missing required name field",
    });
  }
}
module.exports = { addContactValidation, authValidation, favoriteValidation };
