const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === id);

  return contact || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === id);
  if (!contact) {
    return contact;
  }

  const filteredContacts = contacts.filter((contact) => contact.id !== id);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(filteredContacts, null, 2),
    "utf8"
  );
  return filteredContacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(11),
    ...body,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
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
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
