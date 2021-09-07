const { BadRequest } = require("http-errors");

const validation = (schema) => {
  validFunc = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // варіант вивести помилку вручну
      //   return res.status(400).json({
      //     status: "Bad Request",
      //     code: 400,
      //     message: "Ошибка от Joi или другой библиотеки  валидации",
      //   });
      throw new BadRequest("Ошибка от Joi или другой библиотеки  валидации");
    }
    next();
  };

  return validFunc;
};

module.exports = validation;
