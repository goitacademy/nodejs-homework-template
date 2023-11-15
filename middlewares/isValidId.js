const { Types } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

module.exports = isValidId;

// const { isValidObjectId} = require("mongoose");

// const isValidId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   next();
// };

// module.exports = isValidId;