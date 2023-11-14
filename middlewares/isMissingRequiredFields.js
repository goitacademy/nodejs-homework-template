const HttpError = require("../helpers/HttpError");

const isMissingRequiredFields = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");

    return next(
      HttpError(400, `Missing required fields: ${missingFields.join(", ")}`)
    );
  }

  next();
};

module.exports = isMissingRequiredFields;
