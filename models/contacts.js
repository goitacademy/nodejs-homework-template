const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return error.code;
  }
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);

  const contacts = JSON.parse(data);
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );

  return contact;
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    const filteredContacts = contacts.filter((item) => item.id !== contact.id);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8"
    );

    return contact;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    const contacts = JSON.parse(data);
    contacts.push(body);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

    return body;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath, "utf8");

    const contacts = JSON.parse(data);
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");

    return contact;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
