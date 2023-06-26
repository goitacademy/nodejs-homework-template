const validateContact = (schema) => {
  const middleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new Error(error);
    }
    next();
  };
  return middleware;
};

module.exports = { validateContact };
