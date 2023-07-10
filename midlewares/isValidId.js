const {isValidObjectId} = require("mongoose");
const {HttpError} = require("../helpers/HttpError")

const isValidId = (req, res, next) => {
  const { id } = req.params; 
  if (!isValidObjectId(id)) {
      next(new HttpError(404, `${id} is not a valid id`)); 
  }
  next();
};

module.exports = isValidId;
