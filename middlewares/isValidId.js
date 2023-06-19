const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils");

const isValidId = (req, res, next) => {
  const { _id } = req.body;
  
  if (!isValidObjectId(_id)) {
    console.log(_id);
    next(HttpError(400, `${_id} is not valid id `));
  }
  next();
};

module.exports = isValidId;
