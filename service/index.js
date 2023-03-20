const Contact = require("../service/schemas/contact");

const getAllContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: String(contactId) });
  if (!contact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  return contact;
};

const createContact = ({ name,email,phone }) => {
  return Contact.create({ name,email,phone,favorite:false })
}

const updateContactById = (id, body) => {
  return Contact.findByIdAndUpdate(id,body,{ new: true })
}

const removeContact = (id) => {
  const contact = Contact.findByIdAndRemove({ _id: String(id) })
  if (!contact) {
    throw new Error(`Contact with id=${id} not found`);
  }
  return contact;
}
const updateStatusContact = async (contactId, {favorite}) => {
  return await Contact.updateOne({ _id: String(contactId) },{ $set: {favorite: !favorite.value} });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  updateStatusContact,
  removeContact,
}