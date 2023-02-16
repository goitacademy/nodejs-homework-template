const Contacts = require('../service/schemas');

const listContacts = async () => {
  return await Contacts.find({});
};

const getContactById = async contactId => {
  return await Contacts.findOne({ _id: contactId });
};

const removeContact = async contactId => {
  return await Contacts.findByIdAndRemove({ _id: contactId });
};

const addContact = async ({ name, email, phone, favorite }) => {
  return await Contacts.create({ name, email, phone, favorite });
};

const updateContact = async (contactId, body) => {
  return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, favorite) => {
  return await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    {
      new: true,
    }
  );
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
