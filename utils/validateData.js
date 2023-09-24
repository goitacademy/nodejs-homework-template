const {
  addSchema,
  statusSchema,
} = require("../service/schemas/contact");

const validateBody = (body) => {
  return addSchema.validate(body);
};

const validateUpdatedFields = (body, res) => {
  const { name, email, phone, favorite } = body;
  if (!name && !email && !phone && !favorite) {
    return res.status(400).json({ message: "missing fields" });
  }
  return addSchema.validate(body);
};

const validateStatusBody = (body) => {
  return statusSchema.validate(body);
}

module.exports = {
  validateBody,
  validateUpdatedFields,
  validateStatusBody,
};