const { isValidObjectId } = require("mongoose");

const validateIdParam = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    res.status(404).json({ message: `${contactId} is not valid` });
  }
  next();
};

module.exports = validateIdParam;