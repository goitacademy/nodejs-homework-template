const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidID = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid id`));
  }
};
module.exports = isValidID;
