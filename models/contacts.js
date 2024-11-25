const fsPromises = require("fs").promises;
const path = require("path");
const short = require("short-uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

async function readContacts() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}
async function changeContacts(valu) {
  return await fsPromises.writeFile(
    contactsPath,
    JSON.stringify(valu),
    "utf-8"
  );
}

async function listContacts() {
  const data = await readContacts();
  return data;
}

async function getContactById(contactId) {
  const data = await readContacts();
  const idEl = data.filter((contact) => contact.id === contactId.toString());
  return idEl;
}

async function removeContact(contactId) {
  let data = await readContacts();
  const notFoundContact = data.find((el) => el.id === contactId);

  if (!notFoundContact) {
    throw new Error();
  }
  const newData = data.filter((contact) => contact.id !== contactId.toString());
  await changeContacts(newData);
  data = await readContacts();
  return data;
}

async function addContact({ name, email, phone }) {
  const data = await readContacts();
  const id = short.generate();
  const newContact = { id, name, email, phone };
  await changeContacts([...data, newContact]);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const data = await readContacts();
  const defineContact = data.find(({ id }) => id === contactId);
  if (!defineContact) {
    throw new Error();
  }
  const updatedContactEl = { id: contactId, name, email, phone };
  const otherContacts = data.filter(({ id }) => id !== contactId);
  const newData = [...otherContacts, updatedContactEl];
  changeContacts(newData);
  return updatedContactEl;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
