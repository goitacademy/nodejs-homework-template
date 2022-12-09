const validation = (schema) => {
  return function (req, res, next) {
    const valid = schema.validate(req.body);
    if (valid.error) {
      console.log(valid.error.message);
      res.status(400).json({ message: "missing required name field" });
      next(valid.error);
    }
    next();
  };
};

module.exports = { validation };
