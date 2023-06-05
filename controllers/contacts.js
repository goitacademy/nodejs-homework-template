const ContactModel = require("../models/contactsModel");
const { HttpError, controllerWrapper } = require("../helpers");

async function getAllContacts(_, res) {
  const allContacts = await ContactModel.find();

  res.json(allContacts);
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  const contactById = await ContactModel.findById(contactId);

  if (!contactById) {
    throw HttpError(404, "Not found");
  }

  res.json(contactById);
}

async function addContact(req, res) {
  const contactToAdd = await ContactModel.create(req.body);

  res.status(201).json(contactToAdd);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const contactToRemove = await ContactModel.findByIdAndDelete(contactId);

  if (!contactToRemove) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { contactId } = req.params;
  const contactToUpdate = await ContactModel.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!contactToUpdate) {
    throw HttpError(404, "Not found");
  }

  res.json(contactToUpdate);
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;
  const contactStatusToUpdate = await ContactModel.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!contactStatusToUpdate) {
    throw HttpError(404, "Not found");
  }

  res.json(contactStatusToUpdate);
}

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContactById: controllerWrapper(updateContactById),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
