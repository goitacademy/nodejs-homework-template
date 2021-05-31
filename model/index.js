const fs = require("fs/promises");
const { v4: uuid } = require("uuid");
const path = require("path");

const getContacts = async () => {
  const contacts = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );
  return JSON.parse(contacts);
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  return contacts.filter((contact) => String(contact.id) === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const contactIndex = contacts.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (contactIndex !== -1) {
    const result = contacts.splice(contactIndex, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }
  return null;
};

const addContact = async (body) => {
  console.log(body);
  const id = uuid();
  const contact = {
    id,
    ...body,
  };
  const data = await getContacts();
  data.push(contact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return contact;
};

const updateContact = async (contactId, body) => {
  const data = await getContacts();
  const [result] = data.filter((contact) => String(contact.id) === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
