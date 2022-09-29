const { isValidObjectId } = require("mongoose");
// const { RequestError } = require("../helpers/requestError");
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    res.status(404);
    throw new Error(
      res.json({
        status: "error",
        message: `id ${contactId} is not valid`,
      })
    );
  }
  next();
};

module.exports = isValidId;
