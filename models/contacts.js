const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(contacts);
  return result;
};

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const [findContact] = await allContacts.filter(
      (item) => Number(item.id) === contactId
    );
    console.log(findContact);
    return findContact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  const array = [];
  const allContacts = await listContacts();
  array.push(allContacts);
  const findContact = await array.filter(
    (item) => Number(item.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(findContact));
  return findContact;
};

const addContact = async (body) => {
  const contact = { ...body, id: shortid() };
  const contactList = await listContacts();
  contactList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
