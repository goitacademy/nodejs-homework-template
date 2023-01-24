const { contactSchema } = require("../../schemas/contacts");

const contactValidation = (response, request, next) => {
  const result = contactSchema.validate(request.body);

  if (result.error) {
    return response.status(400).json({ status: result.error.details });
  }

  next();
};

module.exports = { contactValidation };
