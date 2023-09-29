import  httpError  from "../helpers/httpError.js";

const isEmptyBody = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return next(httpError(400, "missing fields"))
    }
    next();
}

export default isEmptyBody;