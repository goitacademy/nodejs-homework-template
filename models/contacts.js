const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const dataString = data.toString();
  const contacts = JSON.parse(dataString);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const findContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return findContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index>0){
      contacts.splice(index, 1)
      const contactsList = JSON.stringify([...contacts], null, "\t");
      fs.writeFile(contactsPath, contactsList, "utf8");
  
      return contactId;
    }
   
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
  fs.writeFile(contactsPath, contactsList, "utf8");
 return newContact
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
 contacts.forEach((contact) => {
    if (contact.id === contactId.toString()) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    } 
    

  });
  const contactsList = JSON.stringify( contacts, null, "\t");
  fs.writeFile(contactsPath, contactsList, "utf8");
  return contacts;
};

const updateStatusContact = async (contactId, body)=>{

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
