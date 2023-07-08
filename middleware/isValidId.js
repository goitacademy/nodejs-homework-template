const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
      res.status(400).json({ message: `${contactId} is not valid` });
  } else {
    next();
  }
};

module.exports = isValidId;