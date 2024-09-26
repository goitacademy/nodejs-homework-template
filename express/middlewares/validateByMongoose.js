const { default: mongoose } = require("mongoose");
const createError = require("../../utils/createError");
const ERROR_TYPES = require("../../constants/errors");


const validateObjectId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "Not found",
    });
    return next(error);
  }
  next();
};
  
module.exports = validateObjectId;

