const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .send("<Ошибка от Joi или другой библиотеки валидации>");
    }
    next();
  };
};

module.exports = validation;
