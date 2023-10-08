const { default: mongoose } = require("mongoose");
const createError = require("../../utils/createError");
const ERROR_TYPES = require("../../constants/errors");


  const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "Not found",
    });
    throw error;
  }
}; 
  
module.exports = validateObjectId;