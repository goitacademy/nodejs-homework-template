const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/HttpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400), "Not found");
  }
  next();
};
// const isValidId = (req, res, next) => {
//   const { id } = req.params;
//   Types.ObjectId.isValid(id);
//   if (!isValidId) throw new HttpError(404, "Contact not found");
// };

module.exports = isValidId;
