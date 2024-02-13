const { controlWrapper, HttpError } = require("../../helpers");
const { Contact } = require("../../models/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};
const getContactsById = async (req, res) => {
  const { contactId: id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }
  res.json(contact);
};
const addNewContact = async (req, res) => {
  console.log(req.body);
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};
const deleteContact = async (req, res) => {
  const { contactId: id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "Delete success",
  });
};
const updateContact = async (req, res) => {
  const { contactId: id } = req.params;
  const changedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!changedContact) {
    throw HttpError(404, "Not Found");
  }
  res.json(changedContact);
};
const updateFav = async (req, res) => {
  const { contactId: id } = req.params;
  console.log(req.body);
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log(updateContact);
  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }
  res.json(`Update success`);
};

module.exports = {
  getContacts: controlWrapper(getContacts),
  getContactsById: controlWrapper(getContactsById),
  addNewContact: controlWrapper(addNewContact),
  deleteContact: controlWrapper(deleteContact),
  updateContact: controlWrapper(updateContact),
  updateFav: controlWrapper(updateFav),
};
