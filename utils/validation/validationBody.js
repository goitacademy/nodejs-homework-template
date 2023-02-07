const validationBody = (schemaForValidate) => {
  return function (req, res, next) {
    const validationResult = schemaForValidate.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }
    return next();
  };
};
module.exports = {
  validationBody,
};
