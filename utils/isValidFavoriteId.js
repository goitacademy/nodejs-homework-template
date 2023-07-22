const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

const isValidFavoriteId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpError(404, "Not found"));
    // next(HttpError(400, `${contactId} isn't valid id`));
  }
  next();
};

module.exports = isValidFavoriteId;
