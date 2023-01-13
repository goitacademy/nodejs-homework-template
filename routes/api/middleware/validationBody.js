const validation = (schema) => {
  return function (req, res, next) {
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      console.log(validateBody.error);
      res.status(400).json({ message: "missing required name field" });
      next(validateBody.error);
    }
    next();
  };
};

module.exports = { validation };
