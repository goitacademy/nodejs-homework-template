const HttpError = require('../Helpers/HttpError');

const validateSchemeAddContact = schema => {
    const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);    
             if (error) {
            next(HttpError(404, "missing required name field"));
        }
        next();
    }
    return validate;
}

const validateSchemeUpdContact = schema => {
  const validate = (req, res, next) => {
    console.log(req.body)
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field"));
    }
    next();
  };
  return validate;
};
const validateSchemeFavorContact = (schema) => {
  const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return validate;
};
module.exports = {
    validateSchemeAddContact,
  validateSchemeUpdContact,
    validateSchemeFavorContact
};