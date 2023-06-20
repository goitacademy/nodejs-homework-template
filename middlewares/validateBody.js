const { HttpError } = require("../helpers");
const { bodyValidator } = require("../models");

const validateBody = () => {
  const func = async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      next(HttpError(400, "Missing fields"));
    }

    const { error } = await bodyValidator(req.body);

    if (error) {
      const err = error.details[0].path[0];

      next(HttpError(400, `Missing required '${err}' field`));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
