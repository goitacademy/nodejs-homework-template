const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf8"
  );

  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const deleteContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  contacts.splice(deleteContact, 1);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );

  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, name, phone, email) => {
  const contacts = await readContent();
  const result = contacts.find(item => item.id === contactId);
  if(!result){
    return null
  }
  result.name = name;
  result.email= email;
  result.phone= phone;
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
