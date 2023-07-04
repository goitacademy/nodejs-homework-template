const fs = require("fs/promises");
const FILE_PATH = "models/contacts.json";
const nanoid = import("nanoid");

const generateUniqueId = async () => {
  const currentIds = (await listContacts()).map((contact) => contact.id);
  const generator = (await nanoid).nanoid;
  let id = generator();
  while (currentIds.includes(id)) {
    id = generator();
  }
  console.log(id);
  return id;
};

const writeContactsToFile = async (contacts) => {
  const file = await fs.open(FILE_PATH, "w");
  file.writeFile(JSON.stringify(contacts));
  file.close();
};

const listContacts = async () => {
  const file = await fs.open(FILE_PATH);
  const contacts = JSON.parse(await file.readFile());
  file.close();
  return contacts;
};

const getContactById = async (contactId) => {
  return (await listContacts()).find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return false;
  }
  contacts.splice(contactIndex, 1);
  await writeContactsToFile(contacts);
  return true;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  body = { id: await generateUniqueId(), ...body };
  contacts.push(body);
  await writeContactsToFile(contacts);
  return body;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
