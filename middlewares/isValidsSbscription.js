const { HttpError } = require("../helpers");

const subscription = ["starter", "pro", "business"];

const isValidsSbscription = async (req, res, next) => {
  if (!subscription.includes(req.body.subscription)) {
    next(HttpError(400, "Not valid subscription"));
  }
  next();
};

module.exports = isValidsSbscription;
