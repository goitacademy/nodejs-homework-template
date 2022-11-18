const Joi = require("joi");

const addPostValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: "error", message: "missing required name field" });
  }
  next();
};

const putUpdateValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string().alphanum().min(3).max(30).optional(),
  })
    .required()
    .min(1);

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }

  next();
};

module.exports = { addPostValidation, putUpdateValidation };
