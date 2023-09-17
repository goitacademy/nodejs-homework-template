const { default: mongoose } = require("mongoose");
const HttpError = require("./HttpError");

function isValidId(contactId) {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw HttpError(404, "Not found");
  }
}
module.exports = isValidId;
