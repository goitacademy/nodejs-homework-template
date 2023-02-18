const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join(__dirname, "./contacts.json");


async function listContacts() {
  try {
     const date = await fs.readFile(contactsPath);
     const contacts = JSON.parse(date);
     return contacts;
  } catch (error) {
    console.log(error);
  }
}


async function getContactById(contactId) {
  try {
    const date = await fs.readFile(contactsPath);
    const contacts = JSON.parse(date);
    const result = contacts.find((contact) => contact.id === contactId);;
    return result || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
    try {
      const date = await fs.readFile(contactsPath);
      const contacts = JSON.parse(date);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        return false;
      }
      const deletedContact = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); 
      return deletedContact;
    } catch (error) {
      console.log(error);
    }
}


 async function addContact(body) {
   try {
     const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsNew = { id: Date.now(), name, email, phone };
    const contactsList = JSON.stringify([contactsNew, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, JSON.stringify(contactsList),(err) => {
        if (err) console.error(err);
      });
    return contactsNew;
  } catch (error) {
    console.log(error);
  }
} 

/* async function addContact(body) {
  try {
    const date = await fs.readFile(contactsPath);
    const contacts = JSON.parse(date);
    const contactsNew = { id: Date.now(), ...body };
    const contactsList = JSON.stringify([contactsNew, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, JSON.stringify(contactsList), (err) => {
      if (err) console.error(err);
    });
    return contactsNew;
  } catch (error) {
    console.log(error);
  }
} */

const updateContact = async (contactId, body) => { 
  try {
     const date = await fs.readFile(contactsPath);
     const contacts = JSON.parse(date);
     const index = contacts.findIndex((contact) => contact.id === contactId);
     if (index === -1) {
       return null;
    }
    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(body, null, 2), (err) => {
      if (err) console.error(err);
    });
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};



