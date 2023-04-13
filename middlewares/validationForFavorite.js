const validationForFavorite = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      next(error);
    }
    next();
  };
};
module.exports = validationForFavorite;
