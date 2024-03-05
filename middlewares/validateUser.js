const {
  requiredUserSchema,
  requiredEmailSchema,
} = require("../service/schemas/userSchema");

const validateUserSchema = (req, res, next) => {
  const validation = requiredUserSchema.validate(req.body);

  if (validation.error) {
    res.status(400).json({
      message: validation.error.details[0].message,
    });
  } else next();
};

const validateEmailSchema = (req, res, next) => {
  const validation = requiredEmailSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
    });
  } else next();
};

module.exports = { validateUserSchema, validateEmailSchema };
