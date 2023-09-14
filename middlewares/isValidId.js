const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    res
      .status(400)
      .json({ message: `${req.params.contactId} is not valid id` });
    return;
  }
  next();
};

module.exports = isValidId;
