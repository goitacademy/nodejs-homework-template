const validationBody = (schema) => {
  return function (req, res, next) {
    
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      next(validateBody.error);
    }
    next();
  };
};

module.exports = {
  validationBody,
};
