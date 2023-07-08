const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ message: `missing required ${error.message} field` });
  } else {
    next();
  }
};

module.exports = validateBody;
