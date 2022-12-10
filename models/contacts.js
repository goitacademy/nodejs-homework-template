const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const [findContact] = allContacts.filter((item) => item.id === contactId);
    return findContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const removedList = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(removedList));
    console.table(removedList);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const contact = { ...body, id: shortid() };
  const contactList = await listContacts();

  contactList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contact;
};

const updateContact = async (id, body) => {
  const contactList = await listContacts();
  const idx = contactList.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  contactList[idx] = { ...body, id };
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contactList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
