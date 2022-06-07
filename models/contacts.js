const { Contact, favoriteJoiShema, joiShema } = require("./contact");

const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (data) => {
  const validation = joiShema(data);
  if (!validation.error) {
    const newContact = await Contact.create(data);
    return newContact;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  const validation = joiShema(body);
  if (!validation.error) {
    const upContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return upContact;
  }
  return null;
};

const updateStatusContact = async (contactId, body) => {
  const validation = favoriteJoiShema(body);
  console.log("valid", validation);
  if (!validation.error) {
    const upContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return upContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
