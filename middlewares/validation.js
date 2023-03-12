const validation = ({ schema, message = null }) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;

      if (message) {
        error.message = message;
      }

      next(error);
    }

    next();
  }
};

module.exports = validation;