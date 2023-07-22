const {Contact} = require("../service/schemas/contact")

const listContacts = async () => {
  return Contact.find()
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId })
};

const addContact = async ({ name, email, phone }) => {
  return Contact.create({ name, email, phone })
};

const removeContact = async (contactId) => {
    return Contact.findByIdAndRemove({ _id: contactId })
};

const updateContact = async (contactId, body) => {
return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
};

const updateStatusContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
