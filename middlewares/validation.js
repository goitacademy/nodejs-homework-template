function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.message);
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
