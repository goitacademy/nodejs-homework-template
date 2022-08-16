const Contacts = require('../contactsSchema');

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
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  try {
    return Contacts.create({ name, email, phone, favorite });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContactById = async (contactId, { name, email, phone }) => {
  try {
    return Contacts.findByIdAndUpdate(contactId, { $set: { _id: contactId, name, email, phone } });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateStatusContact = async (contactId, { favorite }) => {
  try {
    return Contacts.findByIdAndUpdate(contactId, {
      $set: { _id: contactId, favorite },
    });
  } catch (err) {
    throw new Error(err.message);
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
