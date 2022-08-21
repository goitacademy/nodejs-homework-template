const Contacts = require('../contactsSchema');

const listContacts = async userId => {
  try {
    return Contacts.find({ owner: userId });
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId, userId) => {
  try {
    return Contacts.findOne({ _id: contactId, userId });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId, userId) => {
  try {
    return Contacts.findByIdAndRemove({ _id: contactId, userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const addContact = async ({ name, email, phone, favorite = false }, userId) => {
  try {
    return Contacts.create({ name, email, phone, favorite, owner: userId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateContactById = async (contactId, { name, email, phone }, userId) => {
  try {
    return Contacts.findByIdAndUpdate(
      { _id: contactId, userId },
      { $set: { _id: contactId, name, email, phone } }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateStatusContact = async (contactId, { favorite }, userId) => {
  try {
    return Contacts.findByIdAndUpdate(
      { _id: contactId, userId },
      {
        $set: { _id: contactId, favorite },
      }
    );
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
