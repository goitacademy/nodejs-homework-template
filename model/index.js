const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (e) {
    return e.message;
  }
};

const getContactById = async (contactId) => {
  try {
    if (contactId) {
      const contactsList = await listContacts();
      const findsContact = await contactsList.filter(
        (contact) => String(contact.id) === String(contactId)
      );
      if (!findsContact) {
        return;
      } else {
        return findsContact;
      }
    }
  } catch (e) {
    return e.message;
  }
};

const removeContact = async (contactId) => {
  if (contactId) {
    try {
      const contactsList = await listContacts();

      const findsContact = await contactsList.find(
        (contact) => String(contact.id) === String(contactId)
      );

      if (!findsContact) {
        return;
      }

      const filteredContact = await contactsList.filter(
        (contact) => String(contact.id) !== String(contactId)
      );

      await fs.writeFile(contactsPath, JSON.stringify(filteredContact));
      return findsContact;
    } catch (e) {
      return e.message;
    }
  }
};

const addContact = async (body) => {
  if (body) {
    try {
      const contactsList = await listContacts();
      const newContact = {
        id: uniqid(),
        ...body,
      };

      if (!Array.isArray(contactsList)) {
        const newContactsList = [newContact, contactsList];
        fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        return newContact;
      }

      contactsList.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contactsList));
      return newContact;
    } catch (e) {
      return e.message;
    }
  }
};

const updateContact = async (contactId, body) => {
  if (contactId && body) {
    try {
      const contactsList = await listContacts();

      const findsContact = await contactsList.find(
        (contact) => String(contact.id) === String(contactId)
      );

      if (findsContact) {
        Object.assign(findsContact, body);

        await fs.writeFile(contactsPath, JSON.stringify(contactsList));

        return findsContact;
      }
    } catch (e) {
      return e.message;
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
