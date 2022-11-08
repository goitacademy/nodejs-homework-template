const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error.name);
      error.status = 400;
      next(error);
    }
  };
};
module.exports = validationBody;
