const fs = require('fs/promises')
const path = require("path")
const contacts = require('./contacts.json');
const { v4 } = require("uuid");
const Contact=require('../model/contact')

const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

 const listContacts = async () => {
  return await Contact.find({});
}
// const listContacts = async () => {
//   return await getData();
// }

const getContactById = async (contactId) => {
  const data = await getData();
  const selectContact = data.find((contact) => contact.id.toString() === contactId.toString());
  return selectContact;
};
 

const removeContact = async (contactId) => {
  const data = await getData();
  const index = data.findIndex(item => item.id.toString() === contactId.toString());
  
  if (index !== -1) {
    data.splice(contactId, 1);
  }

  return index

}


const addContact = async (body) => {
  const data = await getData();
  const newContact = { id: v4(), ...body };
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );

  return newContact;
}

const updateContact = async (contactId, body) => {
  const data = await getData();
  const index = data.findIndex(item => item.id.toString() === contactId.toString());
  if (index === -1) {
   return null
  }
  const updateContact = data.splice(index, 1)[0];
  const changeContact = { ...updateContact, ...body }
  const newData=[...data,changeContact]
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(newData)
  );
  return changeContact; 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
