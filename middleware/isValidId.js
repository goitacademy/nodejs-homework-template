const { isValidObjectId } = require("mongoose");
// const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    res.status(404);
    const error = new Error(
      res.json({
        status: "error",
        message: `id ${contactId} is not valid`,
      })
    );
    return error;
  }
  next();
};

module.exports = isValidId;
