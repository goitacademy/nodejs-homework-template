const Contacts = require('../schemas/contactsSchema');

const listContacts = async () => {
  try {
    return Contacts.find();
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    return Contacts.findOne({ _id: contactId });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    return Contacts.findByIdAndRemove(contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  try {
    return Contacts.create({ name, email, phone, favorite });
  } catch (error) {
    console.log(error);
  }
};

const updateContactById = async (contactId, { name, email, phone }) => {
  try {
    return Contacts.findByIdAndUpdate(contactId, { $set: { _id: contactId, name, email, phone } });
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    return Contacts.findByIdAndUpdate(contactId, {
      $set: { _id: contactId, favorite },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
