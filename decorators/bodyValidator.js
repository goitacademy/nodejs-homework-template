const Joi = require("joi");

const bodyValidator = (schema, requiredFields) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const missingFields = error.details
      .filter((detail) => detail.type === "any.required")
      .map((detail) => detail.context.key);

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(
        ", "
      )}`;
      return res.status(400).json({ message: errorMessage });
    }
  }

  if (requiredFields) {
    const missingRequiredFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingRequiredFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingRequiredFields.join(
        ", "
      )}`;
      return res.status(400).json({ message: errorMessage });
    }
  }

  next();
};

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

module.exports = {
  bodyValidator,
  contactUpdateSchema,
};
