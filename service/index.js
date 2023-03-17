const Contacts = require("./schemas/contact");

const getAllContacts = async () => {
  return Contacts.find();
};

const createContact = async (body) => {
  return Contacts.create(body);
};

const deleteContact = async (id) => {
  return Contacts.findByIdAndDelete(id);
};

const updateContact = async (id, body) => {
  return Contacts.findOneAndUpdate(id, body);
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
};
