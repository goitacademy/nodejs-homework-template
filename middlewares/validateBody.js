const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(HttpError(400, 'missing fields'));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      
      const requiredFields = schema.describe().keys;
      const missingFields = [];

      for (const field in requiredFields) {
        if (requiredFields[field].flags && requiredFields[field].flags.presence === 'required') {
          if (!req.body[field]) {
            missingFields.push(field);
          }
        }
      }

      if (missingFields.length > 0) {
        const message = `missing required ${missingFields.join(', ')} field${missingFields.length > 1 ? 's' : ''}`;
        return next(HttpError(400, message));
      }
    }

    next();
  };
  return func;
};

module.exports = validateBody;
