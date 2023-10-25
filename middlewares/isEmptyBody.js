const { HttpError } = require("../helpers");

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "All fields empty");
  }
};

module.exports = { isEmptyBody };
