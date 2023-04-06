const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, erorr.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
