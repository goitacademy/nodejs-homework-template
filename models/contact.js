
const Contact = require("../schemas/contact")

const listContacts = async () => {
  try {
    return Contact.find();
  } catch (e) {
    console.error(e);
  };
}

const getContactById = async (contactId) => {
return Contact.findOne({ _id: contactId });
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId })

}

const addContact = async (name, email, phone) => {
  return Contact.create({name, email, phone });
  
}

const updateContact = async (contactId, body) => {
  console.log(body)
    return Contact.findByIdAndUpdate({ _id: contactId}, body, { new: true });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
