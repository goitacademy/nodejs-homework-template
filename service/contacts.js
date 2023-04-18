const { Contacts } = require('./schema/contactsSchema');

const getListContacts = async () => {
  return Contacts.find();
   
 
}

const getContactById = async (contactId) => {
  return Contacts.findById({ _id: contactId });
}

const removeContact = async (contactId) => {
  return Contacts.findByIdAndRemove({ _id: contactId });

}

const addContact = async ({name, email, phone}) => {
  return Contacts.create({name, email, phone});
}

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });
}

// Was duplicated until there is no separate logic for it
const updateStatusContact = async (contactId, body) => { 
  return Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });

}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
