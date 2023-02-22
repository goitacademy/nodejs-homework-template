// moongose method to check if a given value can be ID at all
const { isValidObjectId } = require("mongoose");

// import  of possible errors
const { BadRequest } = require("http-errors");

const isValidIdMiddleware = (req, res, next) => {
  const { contactId } = req.params;
  // checking if the value can actually be ID at all
  if (!isValidObjectId(contactId)) {
    next(
      new BadRequest(
        "Hi, I'm ValidId middleware. Id's value is NOT valid Id for a given DB"
      )
    );
  }
  // if Id is valid, we send the value next
  next();
};

module.exports = {
  isValidIdMiddleware,
};
