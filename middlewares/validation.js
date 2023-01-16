const { contactSchema, updateContactSchema } = require("../schemas/schemas");

const contactValidation = (response, request, next) => {
  const result = contactSchema.validate(request.body);

  if (result.error) {
    return response.status(400).json({ status: result.error.details });
  }

  next();
};

const updateContactValidation = (response, request, next) => {
  const result = updateContactSchema.validate(request.body);

  if (result.error) {
    return response.status(400).json({ status: result.error.details });
  }

  next();
};

module.exports = {
  contactValidation,
  updateContactValidation,
};
