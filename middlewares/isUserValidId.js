const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isUserValidId = (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId))
    return next(HttpError(400, ` ${userId} is not valid id`));

  next();
};

module.exports = isUserValidId;
