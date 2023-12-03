const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require ("nanoid");
const { json } = require("express");
// const { json } = require("express/lib/response");

const contactPath = path.join(__dirname, "contacts.json")

const listContacts = async()=>{
    const data = await fs.readFile(contactPath);    
    return JSON.parse(data);
}

const getContactById = async(contactId)=>{
    //const id = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result||null;
}

const addContact = async(data)=>{
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }

    contacts.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const removeContact = async(contactId)=>{
    const contacts = await listContacts();    
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index,1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null , 2)); 
    return result;
}

const updateContact = async(contactId, body)=>{
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
    return null;
  }
  contacts[index] = {id:contactId, ...body};
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
}