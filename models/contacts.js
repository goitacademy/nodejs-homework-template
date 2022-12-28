const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readDb() {
  try {
    const dataRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
    const data = JSON.parse(dataRaw);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const listContacts = async () => {
  // await fs.readFile(contactsPath, { encoding: "utf-8" });
  const dataRow = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const data = JSON.parse(dataRow);
  // console.log(data);
  return data;
};

const getContactById = async (contactId) => {
  const data = await readDb();
  const contact = data.find((contact) => contact.id === contactId);
  console.log(contact);
  return contact;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const id = uuidv4();
  const contact = { id, ...body };
  const db = await readDb();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  const data = await readDb();
  return data;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
