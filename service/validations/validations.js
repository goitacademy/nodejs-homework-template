// Валидация
const validationAdd = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(404).json({ message: "missing required name field" });
    }
    next();
  };
};
const validationPatch = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
module.exports = { validationAdd, validationPatch };
// Валидация
