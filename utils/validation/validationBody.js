const validationBody = (schemaForValidate) => {
  return function (req, res, next) {
    const validationResult = schemaForValidate.validate(req.body);
    if (validationResult.error) {
      return next(validationResult.error);
    }
    return next();
  };
};
module.exports = {
  validationBody,
};
