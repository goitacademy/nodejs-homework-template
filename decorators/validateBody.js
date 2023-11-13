import httpError from "../helpers/httpError.js";

const validateBody = schema => {
    const func = (req, res, next) => {
         const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message))
    }
        next()
    }
    return func;
}

export default validateBody;