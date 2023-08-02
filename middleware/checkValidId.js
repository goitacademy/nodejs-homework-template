const mongoose = require("mongoose");

const checkValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not Found" });
  }
  next();
};

module.exports = checkValidId;
