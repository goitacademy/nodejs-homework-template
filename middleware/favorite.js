const validationFavorite = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
  
      if (error) {
        const error = new Error("missing field favorite");
        error.status = 400;
  
        next(error);
      }
      next();
    };
  };
  
  module.exports = validationFavorite;

  