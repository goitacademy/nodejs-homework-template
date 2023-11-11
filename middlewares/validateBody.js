
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.key;
      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    }
    next();
  };
  return func;
};

module.exports = validateBody;
