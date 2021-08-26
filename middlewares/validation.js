const validation = (schema) => {
  const validationMiddleware = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Ошибка от Joi или другой библиотеки валидации",
      });
    }
    next();
  };

  return validationMiddleware;
};

module.exports = validation;
