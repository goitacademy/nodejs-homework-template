const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactInfo = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const listContacts = async () => {
  try {
    const contacts = await getAll();
    return contacts;
  } catch (error) {
    console.error("Get List method is incomplete", error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  return allContacts[index];
};

// const removeContact = async (contactId) => {
//   const contacts = await getAll();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index >= 0) {
//     const [deletedContact] = contacts.splice(index, 1);
//     await updateContactInfo(contacts);
//     return deletedContact;
//   }
//   return null;
// };

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Contact not found");
    return null;
  }

  const removeContact = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactInfo(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Contact not found");
    return null;
  }

  allContacts[index].name = body.name;
  allContacts[index].email = body.email;
  allContacts[index].phone = body.phone;

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  getContactById,
  listContacts,
  addContact,
  removeContact,
  updateContact,
};
