
const validateBody = (schema, errorMessage) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body || {}); // Додано перевірку на наявність req.body

    if (error) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    next();
  };
};

module.exports = validateBody;