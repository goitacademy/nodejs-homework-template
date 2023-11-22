import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  console.log("req", req.method);
  const keys = Object.keys(req.body);
  if (!keys.length) {
    let errorMassage = "Body must have fields!";
    if (req.method === "PATCH") {
      errorMassage = "missing field favorite";
    }
    return next(HttpError(400, errorMassage));
  }
  next();
};

export default isEmptyBody;
