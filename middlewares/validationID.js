const { BadRequest } = require("http-errors");
const { Types } = require("mongoose");

const validationID = async (req, _res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    const newError = new BadRequest("Invalid ObjectId");
    next(newError);
  }
  next();
};
module.exports = validationID;
