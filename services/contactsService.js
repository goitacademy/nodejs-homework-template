const { Contact } = require("../schemas/contactSchema");

const getAllContacts = async (userId) => await Contact.find({ _id: userId }); // Not id, need owner, check video

const getContactById = async (id) => await Contact.findOne({ _id: id });

const createContact = async ({ name, email, phone, favorite }) =>
  await Contact.create({ name, email, phone, favorite });

const updateContact = async (id, fields) =>
  await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const removeContact = async (id) =>
  await Contact.findByIdAndRemove({ _id: id });

const updateStatusContact = async (id, fields) =>
  await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
