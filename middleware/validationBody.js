const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      error.message = "missing fields";
      error.status = 400;
      next(error);
    }
  };
};
module.exports = validationBody;
