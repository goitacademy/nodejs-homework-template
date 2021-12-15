const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "../model", "contacts.json");

const readContent = async () => {
  try {
    const content = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(content);
    console.table(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContent();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContent();
    const id = contacts.findIndex(
      (contact) => contactId === contact.id.toString()
    );
    if (id === -1) {
      return;
    }
    const update = contacts.splice(id, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return update;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContent();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

// const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
