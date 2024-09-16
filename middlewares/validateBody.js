const { HttpError } = require("../helpers");
 
const validateBody = schema => {
    const func = (req, res, next) => {

        const { error } = schema.validate(req.body);
      if (Object.keys(req.body).length === 0) {
          if (req.method === 'PATCH') {
            next(HttpError(400, "missing field favorite"))
          }
      next(HttpError(400, "Missing fields"));
    }
        if (error) { 
      next(HttpError(400, error.message));
    }
        next();
    }

    return func;
}

module.exports = validateBody;