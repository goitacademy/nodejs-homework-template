const fs = require("fs/promises");

const contactsPath = "./model/contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsArray = JSON.parse(data.toString());
    return contactsArray;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  );
  return `Contact id=${contactId} deleted success`;
};

const addContact = async (body) => {
  // const { name, email, phone } = body;
  const contactsArray = await listContacts();
  const id =
    contactsArray.reduce((maxID, { id } = contact) => Math.max(maxID, id), 0) +
    1;
  body["id"] = id;
  contactsArray.push(body);
  fs.writeFile(contactsPath, JSON.stringify(contactsArray));
  return body;
};

const updateContact = async (contactId, body) => {
  const contactsArray = await listContacts();
  let obj = {};
  let isUpdate = false;

  const newContactArray = contactsArray.map((cont) => {
    if (Number(contactId) === Number(cont.id)) {
      Object.assign(obj, cont, body);
      isUpdate = true;
      return obj;
    }
    return cont;
  });

  fs.writeFile(contactsPath, JSON.stringify(newContactArray));
  return isUpdate ? obj : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
