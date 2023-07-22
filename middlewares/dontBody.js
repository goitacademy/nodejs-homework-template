const { ApiError } = require("../helpers");

const dontBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    switch (req.method) {
      case "PUT":
        throw ApiError(400, "missing fields");

      case "PATCH":
        throw ApiError(400, "missing field favorite ");

      default:
        break;
    }
  }

  next();
};
module.exports = dontBody;
