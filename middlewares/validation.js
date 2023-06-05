const validation = (schema) => {
  const func = async (req, _, next) => {
    const { error } = await schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
  return func;
};

module.exports = validation;