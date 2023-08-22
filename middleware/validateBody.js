const errorHandler = require("../helpers/errorsHandler");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      let message = "missing fields";
      console.log(req.method);
      if (req.method === "PUT") {
        message = "missing fields";
      } else if (req.method === "PATCH") {
        message = "missing field favorite";
      }
      next(errorHandler(400, message));
    }
    const { error } = schema.validate(req.body);
    // console.log(error);
    if (error) {
      const keyName = error.details[0].message;
      next(errorHandler(400, ` ${keyName} `));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
