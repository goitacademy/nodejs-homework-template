const { HttpError } = require("../helpers");

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  const field = [];
  if (!keys.find((item) => item === "name")) field.push("name");
  if (!keys.find((item) => item === "email")) field.push("email");
  if (!keys.find((item) => item === "phone")) field.push("phone");
  if (keys.length === 0) {
    return next(HttpError(400, "All required field names are missing"));
  } else if (keys.length < 3) {
    return next(
      HttpError(
        400,
        `Missing required '${field}' ${keys.length === 1 ? "fields" : "field"}`
      )
    );
  }
  next();
};

module.exports = isEmptyBody;
