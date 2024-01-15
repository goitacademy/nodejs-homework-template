const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");
const { Contact } = require("../models");

const isValidId = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(HttpError(400, `${contactId} is not valid`));

  const { id: owner } = req.user;

  const currentContacts = await Contact.find({ owner });

  if (!currentContacts.some((contact) => contact.id === contactId))
    next(HttpError(400, "Not your contact!!!"));

  next();
};

module.exports = isValidId;