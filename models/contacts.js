const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contscts = await fs.readFile(contactsPath);
    const contactsParse = JSON.parse(contscts);
    return contactsParse;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id == contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const apdadeContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(apdadeContacts, null, 2));
};

const addContact = async (name, email, phone) => {
  try {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const contactList = await listContacts();
    const contact = contactList.find((el) => el.id === contactId);
    if (!contact) {
      return null;
    }
    contactList.forEach((el) => {
      if (el.id == contactId) {
        if (name) {
          el.name = name;
        }
        if (email) {
          el.email = email;
        }
        if (phone) {
          el.phone = phone;
        }
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    return contactList;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
