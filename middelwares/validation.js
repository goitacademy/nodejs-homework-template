const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: error.details });
    }

    next();
  };
};

module.exports = validation;
