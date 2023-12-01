const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(`Checking id: ${contactId}`);
  if (!isValidObjectId(contactId)) {
    console.log(`${contactId} is not a valid ObjectId`);
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
