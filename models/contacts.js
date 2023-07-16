const { Contact } = require("./schemas/contact");

const listContacts = async (owner, skip, limit) => {
  return await Contact.find(owner).skip(skip).limit(limit).populate("owner");
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async ({ name, email, phone, owner }) => {
  return await Contact.create({ name, email, phone, owner });
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
