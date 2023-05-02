const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);

  if (!result) {
    next(RequestError(404, `${id} isn't valid, try again`));
  }
  next();
};

module.exports = isValidId;
