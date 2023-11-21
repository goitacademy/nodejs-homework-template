const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({message: `${id} is not valid id`});
    return;
  }
  next();
};

module.exports = isValidId;
