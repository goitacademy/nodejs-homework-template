const { contactsAction } = require("../helpers");

const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const contacts = await contactsAction.getAllContects();
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await contactsAction.getAllContects();
  const contact = allContacts.find((cont) => cont.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await contactsAction.getAllContects();
  const idx = allContacts.findIndex((cont) => cont.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [remoteContact] = allContacts.splice(idx, 1);
  await contactsAction.updateContacts(allContacts);
  return remoteContact;
};

const addContact = async (body) => {
  const allContacts = await contactsAction.getAllContects();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  allContacts.push(newContact);
  await contactsAction.updateContacts(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await contactsAction.getAllContects();
  const idx = allContacts.findIndex((cont) => cont.id === contactId);
  if (idx === -1) {
    return null;
  }
  await allContacts.forEach((cont) => {
    if (cont.id === contactId) {
      if (name) {
        cont.name = name;
      }
      if (email) {
        cont.email = email;
      }
      if (phone) {
        cont.phone = phone;
      }
    }
  });
  await contactsAction.updateContacts(allContacts);
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
