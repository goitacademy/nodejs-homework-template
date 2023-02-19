const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const getContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    return await getContacts();
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();

    const contactById = contacts.find(({ id }) => id === contactId);

    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await getContacts();

    await fs.writeFile(contactsPath, JSON.stringify([body, ...contacts])),
      { encoding: "utf8" };
    return body;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();

    const contactById = await getContactById(contactId);

    if (!contactById) return;

    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, phone, email } = body;
    const contacts = await getContacts();

    const contactById = await getContactById(contactId);

    if (name) contactById.name = name;

    if (phone) contactById.phone = phone;

    if (email) contactById.email = email;

    let updatedContact = null;

    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        contact = contactById;
        updatedContact = contactById;
      }

      return contact;
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

listContacts();
