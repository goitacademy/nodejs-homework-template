const Contacts = require("./contact");

const listContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const delContact = await Contacts.findByIdAndDelete(contactId);
  if (delContact) return true;
  else return false;
};

const addContact = async (body) => {
  const contacts = await Contacts.find();

  const ERROR_MESSAGE = "Такой контакт уже существует";

  if (contacts.some((item) => item.phone === body.phone)) {
    return ERROR_MESSAGE;
  } else {
    const contact = await Contacts.create(body);
    return contact;
  }
};

const updateContacts = async (contactId, body) => {
  await Contacts.findByIdAndUpdate(contactId, body);
  const changedContact = await Contacts.findById(contactId);
  return changedContact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateStatusContact,
};
