const Contacts = require("./schemas/contacts");

const listContacts = async () => {
  return Contacts.find();
};

const getContactById = (id) => {
  return Contacts.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contacts.create({ name, email, phone, favorite });
};

const updateContact = (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateStatusContact = (id, favorite) => {
    return Contacts.updateOne({ _id: id }, { $set: { favorite: !favorite } });
};

const removeContact = (id) => {
  return Contacts.findByIdAndRemove({ _id: id });
};

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
