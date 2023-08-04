const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      console.log("error from validation middleware");
      next(error);
    }
    next();
  };
};

module.exports = validation;
