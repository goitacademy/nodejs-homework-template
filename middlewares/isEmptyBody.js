// const HttpError = require("../helpers/HttpError");

// const isEmptyBody = (req, res, next) => {
//   if (!Object.keys(req.body).length) {
//     return next(HttpError(400, "All fields empty"));
//   }
//   next();
// };

// module.exports = isEmptyBody;

// const HttpError = require("../helpers/HttpError");

// const isEmptyBody = (req, res, next) => {
//   if (!Object.keys(req.body).length) {
//     return next(HttpError(400, "missing fields"));
//   }
//   next();
// };

// module.exports = isEmptyBody;

const isEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  next();
};

module.exports = isEmptyBody;
