const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

//робимо мідлвару яка перевіря валідність ід (чи може буди те що ми передали взагалі айдішніком)
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId} invalid format`));
  }
  next();
};

module.exports = isValidId;
