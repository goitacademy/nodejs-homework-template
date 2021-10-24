const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { Subscription } = require("../../config/constans");

const schemaSignUpUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk", "ca"] },
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,18}$/, "password")
    .required(),
  subscription: Joi.string().optional(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaUpdateSubUser = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `missing required name field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateUser = async (req, res, next) => {
  return await validate(schemaSignUpUser, req.body, res, next);
};

module.exports.validateLoginUser = async (req, res, next) => {
  return await validate(schemaLoginUser, req.body, res, next);
};

module.exports.validateUpdateSub = async (req, res, next) => {
  return await validate(schemaUpdateSubUser, req.body, res, next);
};
