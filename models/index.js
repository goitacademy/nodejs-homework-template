const Contact = require("./schemas/contacts.schema");

const listContacts = async () => {
  return Contact.find();
};
const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  const contactIdToString = contactId.toString();
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(
    ({ id }) => id === contactIdToString
  );
  if (contactIdFromArr === -1) {
    return -1;
  }
  const [deletedContact] = contacts.splice(contactIdFromArr, 1);
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  // const contacts = await listContacts();
  // contacts.push(newContact);
  // return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdFromArr === -1) {
    return -1;
  }
  contacts[contactIdFromArr] = { ...contacts[contactIdFromArr], ...body };
  const updatedContact = contacts[contactIdFromArr];
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
