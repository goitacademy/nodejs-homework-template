const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(dataString);
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact ? contact : null;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();

  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  const deletedContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  }

  return deletedContact ? deletedContact : null;
};

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    allContacts[index].name = name;
    allContacts[index].email = email;
    allContacts[index].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return allContacts[index];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
