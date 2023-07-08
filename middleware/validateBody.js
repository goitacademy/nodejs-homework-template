const { contactSchema } = require("../models/joiSchemas");

const validateBody = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  } else {
    next();
  }
};

module.exports = validateBody;
