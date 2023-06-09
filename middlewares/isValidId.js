const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
   const { contactId } = req.params;
   if (!isValidObjectId(contactId)) {
	// return res.status(404).json({ message: `${contactId} invalid id format`});
	next(HttpError(404, `${contactId} invalid id format`));
   }
   next();
};

module.exports = isValidId;