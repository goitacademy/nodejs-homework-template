const { HttpError } = require("../helpers");

const validateBody = (schema) => {
 
  const func = (req, res, next) => {
     console.log("валідація даних, які прийшли");
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("не пройшла валідацію joi");
      console.log(error.message);
      next(HttpError(400, error.message));
    }
    console.log("пройшла валідацію joi");
    next();
  };

  return func;
};

module.exports = validateBody;
