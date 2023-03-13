const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: `${error}` });
    }
    return next();
  };
};
module.exports = { validationMiddleware };
