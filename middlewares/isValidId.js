const { isValidObjectId } = require("mongoose");

const isValideId = (req, _, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    const error = new Error("invalid id");
    error.status = 404;

    next(error);
  }
  next();
};
module.exports = isValideId;
