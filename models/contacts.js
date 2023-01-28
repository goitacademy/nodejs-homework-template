const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactPath = path.join(__dirname, "contacts.json");

const updateSet = async (body) =>
  fs.writeFile(contactPath, JSON.stringify(body, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.Id === contactId);
  if (index === -1) 
    return null;
    return contacts[index];
  
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.Id === contactId);
  if (index === -1) 
    return null;

    const deleteContact = contacts.splise(index, 1);
    await updateSet(contacts);
    
    return deleteContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone
  }
  contacts.push(newContact)

  await updateSet(contacts)

  return newContact
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.Id === contactId);
  if (index === -1) 
    return null;

    const updateContac= {
      ...contacts[index],
      ...body,
    }
    contacts[index] = updateContac;

    return updateContac
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
