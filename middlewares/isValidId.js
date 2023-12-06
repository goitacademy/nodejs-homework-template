const mongoose = require("mongoose");
const HttpError = require("../helpers/HttpError");
const { getContactById } = require("../models/contacts/index");

const isValidId = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(404).json({ message: "Not Found" });
  }

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not Found" });
    }

    next();
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = isValidId;
