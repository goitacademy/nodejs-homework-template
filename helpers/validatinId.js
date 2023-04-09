const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
};

module.exports = isValidId;
