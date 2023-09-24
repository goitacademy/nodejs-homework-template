const validation = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Missing fields" });
      }
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};


module.exports = validation;