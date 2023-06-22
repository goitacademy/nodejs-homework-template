const { HttpError } = require("../helpers");
const { subValidator } = require("../models");

const validateSubscription = () => {
  const func = async (req, res, next) => {
    
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing field subscription"));
    }

    const { error } = await subValidator(req.body);

    if (error) {
      next(HttpError(400, "Missing field subscription"));
    }

    next();
  };
  return func;
};

module.exports = validateSubscription;
