const fs = require("fs/promises");
const Joi = require("joi");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const contactBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const listContacts = async () => {
  const stringifiedContacts = await fs.readFile(contactsPath, "utf-8");
  const contactsParsed = JSON.parse(stringifiedContacts);

  return contactsParsed;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const cotactById = contacts.find((contact) => contact.id === contactId);
  if (!cotactById) return null;

  return cotactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContactById = await getContactById(contactId);
  const updatedContacts = contacts.filter(
    (contact) => contactId !== contact.id
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return removedContactById;
};

const addContact = async (newContact) => {
  const contacts = await listContacts();

  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) return { ...contact, ...body };
    return contact;
  });
  const updatedContact = updatedContacts.find(
    (contact) => contact.id === contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactBodySchema,
};
