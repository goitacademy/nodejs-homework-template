const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const foundContact = contactsList.find((contact) => contact.id === contactId);
  return foundContact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: String(Number(contactsList[contactsList.length - 1].id) + 1),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const filtredContacts = JSON.stringify(
    contactsList.filter((contact) => contact.id !== contactId)
  );
  fs.writeFile(contactsPath, filtredContacts);
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const editedContactList = contactsList.map((contact) => {
    if (contact.id === contactId) {
      const editedContact = {
        id: contact.id,
        name: body.name ? body.name : contact.name,
        email: body.email ? body.email : contact.email,
        phone: body.phone ? body.phone : contact.phone,
      };

      return editedContact;
    } else {
      return contact;
    }
  });
  fs.writeFile(contactsPath, JSON.stringify(editedContactList));

  return editedContactList[contactId - 1];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
