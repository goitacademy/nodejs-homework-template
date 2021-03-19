const Joi = require("joi");
const { HttpCode } = require("../../../helpers/constants");

const schemaUserRegistration = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  password: Joi.string().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "bad request",
    });
  }
  next();
};

const userRegistation = (req, res, next) => {
  return validate(schemaUserRegistration, req.body, next);
};

const userLogin = (req, res, next) => {
  return validate(schemaUserLogin, req.body, next);
};

const uploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "File is not found",
    });
  }
  next();
};

module.exports = {
  userRegistation,
  userLogin,
  uploadAvatar,
};
