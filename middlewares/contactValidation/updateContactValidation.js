const { updateContactSchema } = require("../../schemas/contacts");

const updateContactValidation = (response, request, next) => {
  const result = updateContactSchema.validate(request.body);

  if (result.error) {
    return response.status(400).json({ status: result.error.details });
  }

  next();
};

module.exports = { updateContactValidation };
