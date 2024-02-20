const { requiredUserSchema } = require("../../service/Schemas/userSchema");

const validateUserSchema = (req, res, next) => {
  const validation = requiredUserSchema.validate(req.body);

  if (validation.error) {
    res.status(400).json({
      status: "Bad request",
      message: validation.error.details[0].message,
    });
  } else next();
};

module.exports = validateUserSchema;
