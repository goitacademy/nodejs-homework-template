const validateWithDynamicError = (schema, getErrorMessage) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = getErrorMessage ? getErrorMessage(error) : error.message;
      return res.status(400).json({ message });
    }
    next();
  };
};

const validate = (schema, errorMessage) => validateWithDynamicError(schema, () => errorMessage);

module.exports = {
  addValid: (schema) => validateWithDynamicError(schema, (error) => `missing required ${error.details[0].context.label} field`),
  updateValid: (schema) => validate(schema, 'missing field'),
  updateFavValid: (schema) => validate(schema, 'missing field favorite'),
  registerValid: validate,
  loginValid: validate,
  updateSubscriptionValid: validate,
};