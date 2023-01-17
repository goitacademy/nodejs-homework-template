const path = require("path");
const fs = require('fs/promises');
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readDB() {
    
    try {
        const dbRaw = await fs.readFile(contactsPath, "utf8");
        const db = JSON.parse(dbRaw);
        return db;

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    };
};

async function writeDB(db) {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, -2))
}


const listContacts = async () => {
   const db = await readDB();
    console.table(db);
    return db;
}

const getContactById = async (contactId) => {
  const db = await listContacts();
    const contact = db.find(
        (contact) => contact.id == contactId
    );
  console.log(contact);
  return contact;
}

const removeContact = async (contactId) => {
  const db = await readDB();
    const updateDB = db.filter(todo => todo.id !== contactId);
    await writeDB(updateDB);
    console.log(`Id: ${contactId} was deleted`);
}

const addContact = async (body) => {
  const id = nanoid(7);
  const contact = { id, ...body };
  const db = await readDB();
  db.push(contact);
  await writeDB(db);
};

const updateContact = async (contactId, body) => {
  const data = await readDB();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return data[index];
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  };
