const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function generateId() {
  const { nanoid } = await import("nanoid");
  return nanoid();
}

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    if (contacts) {
      const contactExists = contacts.some(
        (contact) => contact.id === contactId.toString()
      );
      if (!contactExists) {
        return false;
      }
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId.toString()
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
      return true;
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newId = (await generateId()).toString();
    const newContact = { id: newId, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    if (contacts) {
      const contactExists = contacts.some(
        (contact) => contact.id === contactId.toString()
      );
      if (!contactExists) {
        return false;
      } else {
        const { name, email, phone } = body;
        const updatedContact = { id: contactId, name, email, phone };
        const updatedContacts = contacts.map((contact) =>
          contact.id === contactId.toString() ? updatedContact : contact
        );
        await fs.writeFile(
          contactsPath,
          JSON.stringify(updatedContacts, null, 2)
        );
        return updatedContact;
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
