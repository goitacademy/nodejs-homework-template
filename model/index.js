const fs = require("fs/promises");
// const contacts = require("./contacts.json");

const contactsPath = "./model/contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsArray = JSON.parse(data.toString());
    // const contactsArray = data.toString();
    // console.log(`conacts array ${contactsArray}`);
    return contactsArray;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  console.table(contacts.find((contact) => contact.id === contactId));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  );
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contactsArray = await listContacts();
  const id =
    contactsArray.reduce((maxID, { id } = contact) => Math.max(maxID, id), 0) +
    1;

  contactsArray.push({
    id: id,
    name: name,
    email: email,
    phone: phone,
  });

  fs.writeFile(contactsPath, JSON.stringify(contactsArray));
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
