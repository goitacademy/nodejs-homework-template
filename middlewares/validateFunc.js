const { HttpError } = require("../helpers");

const validateFunc = schema => {
    const decoratorFunc = (req, res, next) => {
         const { error } = schema.validate(req.body);
          if (error) {
            next(HttpError(400, error.message));
          }
      next();
    }

    return decoratorFunc;
}

module.exports = validateFunc;