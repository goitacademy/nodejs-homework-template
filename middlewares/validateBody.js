const {HttpError} = require("../helpers");

const validateBody = schema => {
  const func = (req, res, next) => {

    if (Object.keys(req.body).length === 0 && req.route.path === "/:contactId") {
      throw HttpError(400, "missing fields"); 
    }
    
    if (Object.keys(req.body).length === 0 && req.route.path === "/:contactId/favorite") {
      throw HttpError(400, "missing field favorite"); 
    }

    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }
    
    next();
  }

  return func;
}

module.exports = validateBody;