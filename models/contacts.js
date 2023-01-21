const path = require("path");
const fs = require('fs/promises');
const { Contact } = require("../schemas/contact");

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
   return Contact.find();
}

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
}

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  };
