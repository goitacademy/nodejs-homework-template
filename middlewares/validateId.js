const { Contact } = require("../models");
const { Types } = require("mongoose");
const { HttpError, wrapper } = require("../helpers");

const validateId = async (req, res, next) => {
  const { contactId } = req.params;

  const isValidId = Types.ObjectId.isValid(contactId);

  if (!isValidId) {
    throw HttpError(400, "Bad id");
  }

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  req.contact = contact;

  next();
};

module.exports = wrapper(validateId);
