const userValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json("Помилка від Joi або іншої бібліотеки валідації");
    }

    next();
  };

  return func;
};

module.exports = userValidateBody;
