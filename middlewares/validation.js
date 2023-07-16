const validation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const [{ message }] = error.details;
      error.status = 400;
      error.message = `missing required ${message.replace(/"/g, "")} field`;
      next(error);
    }

    next();
  };
};

module.exports = validation;
