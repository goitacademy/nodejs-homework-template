const { addSchema } = require("../models/contact");

const validateBody = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      message: errorMessage,
    });
  }
  return next();
};

module.exports = validateBody;
