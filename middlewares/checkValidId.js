const { isValidObjectId } = require("mongoose");
const errorMessage = require("../helpers/errorMessage.js");

const checkValidId = (req, _, next) => {
  const id = req.params.contactId;
  const result = isValidObjectId(id);

  if (!result) {
    next(
      errorMessage(
        400,
        ` ID: ${id} isn't valid. ID format must be a 24-character combination of numbers and letters`
      )
      //     errorMessage(
      //     404, "Not Found"
      //   )
    );
  }
  next();
};

module.exports = checkValidId;
