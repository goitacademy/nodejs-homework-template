const fs = require("fs").promises;
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const contactsList = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const list = JSON.parse(data);
  return list;
};

const getContactById = async (id) => {
  const contacts = await contactsList();
  const contactById = contacts.find((contact) => contact.id === id);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const addContactItem = async (body) => {
  const contacts = await contactsList();
  const newContact = { id: uuid(), ...body };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};
const updateContact = async (id, body) => {
  const contacts = await contactsList();
  const { name, email, phone } = body;

  contacts.forEach((contact) => {
    if (contact.id === id) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
    }
  });
  updateContacts(contacts);
  return contacts;
};

const removeContactById = async (id) => {
  const contacts = await contactsList();
  const contact = contacts.findIndex((contact) => contact.id === id);
  if (contact === -1) {
    return null;
  }

  const filteredContacts = contacts.filter((_, index) => index !== contact);
  updateContacts(filteredContacts);
  return contacts[contact];
};

module.exports = {
  contactsList,
  getContactById,
  addContactItem,
  updateContact,
  removeContactById,
};
