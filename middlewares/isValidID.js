const { isValidObjectId } = require("mongoose");

const isValid = (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      const error = new Error(`${contactId} is invalid user ID`);
      error.status = 404;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValid;
