const {requestError} = require('../helpers')

const validateBody = (addSchema) => {
  const func = (request, response, next) => {
    const {error} = addSchema.validate(request.body);
    if (error) {
      next(requestError(400, error.message))
    };
    next();
  };
  return func
};

module.exports = validateBody
