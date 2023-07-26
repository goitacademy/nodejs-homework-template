const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contactList = await Contact.find({ owner }, "-createdAt -updatedAt");
  res.status(200).json({
    msg: "You Contact List!",
    contact: contactList,
  });
};

const idContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found contact");
  }
  res.status(200).json({
    msg: "Success! Contact find",
    contact,
  });
};

const createContact = async (req, res, next) => {
   const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found contact");
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
    throw HttpError(404, "Not found contact");
  }
  res.status(201).json({
    msg: "Contact update success!",
    contact: updateContact,
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(400, "missing field favorite");
  }
  res.status(200).json({
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
