const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}


 const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId.toString());
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const addedContact = {
    ...body,
    id: nanoid(),
  };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const newListContact = contacts.map((item) => {
    if (item.id !== contactId) {
      return { ...item };
    }
    return {
      id: contactId,
      ...body,
    };
  });
  await fs.writeFile(contactsPath, JSON.stringify(newListContact));
  return newListContact.find((item) => item.id === contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
