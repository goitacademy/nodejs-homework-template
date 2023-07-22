const { ApiError } = require("../helpers");

const dontBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    switch (req.method) {
      case "PATCH":
        throw ApiError(400, "missing field favorite ");

      default:
        throw ApiError(400, "missing fields");
    }
  }

  next();
};
module.exports = dontBody;
