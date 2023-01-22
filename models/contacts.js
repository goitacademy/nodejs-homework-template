const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const foundContact = JSON.parse(contacts).find(
      (contact) => Number(contact.id) === Number(contactId)
    );
    return foundContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parseContacts = JSON.parse(contacts);

    const foundContact = await getContactById(contactId);

    const refreshContacts = parseContacts.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return foundContact;
  } catch (error) {
    console.log("remove error:", error);
    return error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parseContacts = JSON.parse(contacts);

    const newID = () => {
      for (let index = 0; index < parseContacts.length; index += 1) {
        if (Number(parseContacts[index].id) !== index + 1) {
          return (index + 1).toString();
        }
      }
      return (parseContacts.length + 1).toString();
    };

    const newContact = {
      id: newID(),
      name,
      email,
      phone,
    };

    const refreshContacts = [...parseContacts, newContact].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parseContacts = JSON.parse(contacts);

    parseContacts.forEach((contact) => {
      const id = Number(contact.id);
      if (id === Number(contactId)) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(parseContacts), "utf8");
    const newContact = await getContactById(contactId);
    return newContact;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
