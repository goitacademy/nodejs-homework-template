const { HttpError } = require("../helpers");
//catch error and pass in next
const validateBody = (schema) => {
  const func = (req, res, next) => {
    if(Object.keys(req.body).length === 0){
      next(HttpError(400, "missing fields"));
  }
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldName = error.details[0].message;
      next(HttpError(400, ` ${fieldName} `));
    }
    next();
  };
  return func;
};

module.exports = validateBody;