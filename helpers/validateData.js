const contactSchema = require("../schemas/contact.js");

const validateContact = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const missingFields = error.details.map(
      (detail) => `${detail.context.key}`
    );

    return res.status(400).json({
      message: `missing required ${missingFields.join(", ")} field${
        missingFields.length > 1 ? "s" : ""
      }`,
    });
  }

  req.body = value;
  next();
};

module.exports = validateContact;
