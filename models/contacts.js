const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const getDb = async () => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};

const listContacts = async () => {
  return await getDb();
};

const getContactById = async (contactId) => {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const id = uuidv4();
  const contact = { id: id, name: name, email: email, phone: phone };
  const db = await getDb();
  const updateDb = [...db, contact];
  await fs.writeFile(contactsPath, JSON.stringify(updateDb));
  return contact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contact = { id: contactId, name: name, email: email, phone: phone };
  // let contact = {};
  const db = await getDb();
  const updateDb = db.map((it) => {
    if (it.id === contactId) {
      // if (name) {
      //   it.name = name;
      // }
      // if (email) {
      //   it.email = email;
      // }
      // if (phone) {
      //   it.phone = phone;
      // }
      // contact = it;
      // return it;
      // console.log("it:", it);
      return contact;
    }
    return it;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updateDb));
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
