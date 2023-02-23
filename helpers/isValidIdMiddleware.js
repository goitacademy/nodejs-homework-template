const { isValidObjectId } = require("mongoose");

const { BadRequest } = require("http-errors");

const isValidIdMiddleware = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(
      new BadRequest(
        "Hi, I'm ValidId middleware. Id's value is NOT valid Id for a given DB"
      )
    );
  }
  next();
};

module.exports = {
  isValidIdMiddleware,
};
