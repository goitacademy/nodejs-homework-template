// middlewares\validateId.js

const Joi = require("joi");

const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().length(24).hex().required(),
  });

  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    console.error("Error validating ID:", error);
    return res.status(400).json({ message: "Invalid ID format" });
  }

  next();
};

module.exports = validateId;
