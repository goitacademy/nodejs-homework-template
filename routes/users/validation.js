const Joi = require("joi");
const { HttpCode } = require("../../config/constants");

const regularExpression =
  "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
const schema = Joi.object({
  password: Joi.string().pattern(new RegExp(regularExpression)).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "ru", "pl"] },
    })
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
});

const schemaSubscriptionUser = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing required name field",
      //   message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateUser = async (req, res, next) => {
  return await validate(schema, req.body, res, next);
};

module.exports.validateSubscriptionUser = async (req, res, next) => {
  return await validate(schemaSubscriptionUser, req.body, res, next);
};
