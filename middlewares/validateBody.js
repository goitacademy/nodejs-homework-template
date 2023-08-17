const {HttpError} = require("../helpers");


const validateBody = (schema) => {
  const funk = (req, res, next) => {
    if(Object.keys(req.body).length === 0){
      throw HttpError(400, "missing fields");
    }
    const {error} = schema.validate(req.body);
    if(error) {
      next(HttpError(400, error.message));
    }
    next();
  }
  return funk;
};

const validateUpdateStatusContact = (schema) => {
  const func =(req, res, next) => {
    const{error} = schema.validate(req.body);
    if(error){
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
}
module.exports = {
  validateUpdateStatusContact,
  validateBody
};