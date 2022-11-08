const validationBody = (schema) => {
  return async (req, res, next) => {
    await schema.validateAsync(req.body);
    next();
  };
};
module.exports = validationBody;
