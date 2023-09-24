const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contacts = require("./contacts.json");

let url = path.join(__dirname + "/contacts.json");

const filePath = path.join(__dirname, "contacts.json");
const listContacts = async() => {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
  let list = await listContacts();
  let result = list.find((element) => element.id === contactId);
  return result || null;
};


const removeContact = async (contactId) => {
  let list = await listContacts();
  let indexToDelete = list.findIndex((element) => element.id === contactId);
  if (indexToDelete >= 0) {
    let result = list.splice(indexToDelete, 1);
    saveContacts(list);
    return result[0];
  } else {
    return null;
  }
};

const addContact = async (body) => {
  let list = await listContacts();
  let { name, email, phone } = body;
  let newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await saveContacts(list);
  return newContact;
};

async function saveContacts(list) {
  await fs.writeFile(url, JSON.stringify(list));
}

const updateContact = async (contactId, body) => {
  let list = await listContacts();
  let indexToUpdate = list.findIndex((element) => element.id === contactId);
  if (indexToUpdate >= 0) {
    list[indexToUpdate] = {...list[indexToUpdate], ...body}
    saveContacts(list);
    return list[indexToUpdate];
  } else {
    return null;
  }
  
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
