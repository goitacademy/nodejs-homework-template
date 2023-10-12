const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId: id } = req.params;
  if (!isValidObjectId(id)) next(HttpError(`${id} isn't valid id`, 400));
  next();
};

module.exports = { isValidId };