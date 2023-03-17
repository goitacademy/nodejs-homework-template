const Contact = require("../service/schemas/contact");

const getAllContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

const getContactById = async(id) => {
  /* return Contact.findOne({ _id: id }) */
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error(`Contact with id=${id} not found`);
  }
  return contact;
}

const createContact = ({ name,email,phone }) => {
  return Contact.create({ name,email,phone })
}

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate(id,body,{ new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}
const updateStatusContact = async (contactId, body) => {
  return await updateContact(contactId, body);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
}