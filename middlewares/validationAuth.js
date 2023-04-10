const validationAuth = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "POST" && error) {
      res.status(400).json({
        message: `Помилка від Joi або іншої бібліотеки валідації`,
      });
      return;
    }
    next();
  };
};

module.exports = validationAuth;
