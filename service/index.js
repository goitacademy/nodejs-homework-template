const { Contact } = require("./schemas/contact");

const getAllContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
    const result = await Contact.findById(contactId);
    return result;
  }
  return null;
};

const removeContact = async (contactId) => {
  const currentContact = await getContactById(contactId);
  if (!currentContact) {
    return null;
  }
  await Contact.findByIdAndRemove(contactId);
  return currentContact;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const currentContact = await getContactById(contactId);
  if (!currentContact) {
    return null;
  }
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const currentContact = await getContactById(contactId);
  if (!currentContact) {
    return null;
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};