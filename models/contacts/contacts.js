const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((item) => item.id === contactId.toString());
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const rcindex = contactList.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (rcindex === -1) return null;
  const [res] = contactList.splice(rcindex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return res;
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};


const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => {
    return contact.id === contactId;
  });

  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, 0, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
