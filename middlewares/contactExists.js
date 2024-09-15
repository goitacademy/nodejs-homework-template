const { Contact } = require("../models/contactModel");
const { HttpError } = require("../helpers");

const doesContactExist = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { email, phone } = req.body;

  const userContacts = await Contact.find({ owner }, "-createdAt -updatedAt");

  const doesExist = userContacts.find(
    (contact) => contact.email === email || contact.phone === phone
  );
  if (doesExist) {
    next(HttpError(409, "Contact already exists"));
  }
  next();
};

module.exports = doesContactExist;
