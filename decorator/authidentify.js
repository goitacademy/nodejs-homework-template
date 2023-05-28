const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const HttpError = require("../helper/HttpError");

const authidentify = async (res, req, next) => {
  const { authorization = "" } = req.header;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(new HttpError(401, "Unauthorized"));
  }
  try {
    const tokanValid = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.log(error);
    return next(new HttpError(401, "Unauthorized"));
  }
  next();
};

module.exports = authidentify;
