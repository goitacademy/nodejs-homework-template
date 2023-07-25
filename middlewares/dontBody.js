const service = require("../service");

const dontBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    switch (req.method) {
      case "PATCH":
        throw service.CreateError(400, "missing field favorite ");

      default:
        throw service.CreateError(400, "missing fields");
    }
  }

  next();
};
module.exports = dontBody;
