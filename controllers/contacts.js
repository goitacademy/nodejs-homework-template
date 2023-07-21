const { Contact } = require("../models/contact");

const { AppError, ctrlWrapper } = require("../utils");

const allContacts = async (req, res, next) => {
  const contactList = await Contact.find();
  res.status(200).json({
    msg: "Load Contact List!",
    contact: contactList,
  });
};

const idContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw AppError(404, "Not found contact");
  }
  res.status(200).json({
    msg: "Success! Contact find",
    contact,
  });
};

const createContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId, req.body);
  if (!result) {
    throw AppError(404, "Not found contact");
  }
  res.status(200).json({
    msg: "Success! Contact delete",
    contact: result,
  });
};

const refreshContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updateContact) {
    throw AppError(404, "Not found contact");
  }
  res.status(201).json({
    msg: "Contact update success!",
    contact: updateContact,
  });
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw AppError(404, "Not found contact");
  }
  res.status(201).json({
    msg: "Contact update!",
    contact: result,
  });
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  idContact: ctrlWrapper(idContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  refreshContact: ctrlWrapper(refreshContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
