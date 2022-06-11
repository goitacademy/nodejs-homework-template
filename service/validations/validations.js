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
const validationRegister = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Ошибка от Joi или другой библиотеки валидации" });
    }
    next();
  };
};
const validationSubsribtion = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          message: "Ошибка от Joi проверьте правильность написания подписки",
        });
    }
    next();
  };
};
module.exports = {
  validationAdd,
  validationPatch,
  validationRegister,
  validationSubsribtion,
};
// Валидация
