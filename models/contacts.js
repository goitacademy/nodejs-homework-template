const Contact = require("./contact");

const listContacts = async (owner) => {
  return Contact.find({ owner });
};

const getContactById = async (contactId, owner) => {
  return Contact.findOne({ _id: contactId, owner });
};

const removeContact = async (contactId, owner) => {
  return Contact.findOneAndDelete({ _id: contactId, owner });
};

const addContact = async (body, owner) => {
  return Contact.create({ ...body, owner });
};

const updateContact = async (contactId, body, owner) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, favorite, owner) => {
  return Contact.findOneAndUpdate(
    { _id: contactId, owner },
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
