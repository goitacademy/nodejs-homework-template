const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      error.status = 400;
      throw error;
    }

    next();
  };
};

module.exports = validate;
