const fs = require("fs/promises");

const contactsPath = "./models/contacts.json";

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (contact) => Number(contact.id) === Number(contactId.id)
  );
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const newContacts = [
    ...parsedContacts,
    {
      id: String(parsedContacts.length + 1),
      name: body.name,
      email: body.email,
      phone: String(body.phone),
    },
  ];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId.id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  !result || (await fs.writeFile(contactsPath, JSON.stringify(contacts)));
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => Number(contact.id) === contactId);
  console.log(result);
  if (!result) {
    return null;
  }
  result.name = body.name;
  result.phone = body.phone;
  result.email = body.email;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
