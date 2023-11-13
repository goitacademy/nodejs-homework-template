const { validObjectId } = require("mongoose");

const validId = (req, res, next) => {
  const { contactId } = req.params;
  if (!validObjectId(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
};

module.exports = validId;