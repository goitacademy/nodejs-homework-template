const { Contacts } = require('./contactsSchema');

const getListContacts = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  return Contacts.find({ owner })
    .select({ createdAt: 0, updatedAt: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ favorite: -1 });
    
}

const getContactById = async (contactId, owner) => {
  return Contacts.findById({ _id: contactId, owner});
}

const removeContact = async (contactId, owner) => {
  return Contacts.findByIdAndRemove({ _id: contactId, owner });

}

const addContact = async ({name, email, phone}, owner) => {
  return Contacts.create({ name, email, phone, owner });
}

const updateContact = async (contactId, body, owner) => {
  return Contacts.findByIdAndUpdate({ _id: contactId, owner }, body, { new: true });
}

// Was duplicated until there is no separate logic for it
const updateStatusContact = async (contactId, body,owner) => { 
  return Contacts.findByIdAndUpdate({ _id: contactId, owner }, body, { new: true });

}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
