const fs = require('fs/promises')
const path = require("path");
const contactsPath =("./models/contacts.json")

const listContacts = async () => {
  try {
    const text = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(text);
  } catch (e) {
    console.error(e);
  };
}

const getContactById = async (contactId) => {
  try {
    const text = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(text);
    let contact = contacts.filter(c => c.id=== contactId);
    return contact;
  } catch (e) {
    console.error(e)
  };
}

const removeContact = async (contactId) => {
  try{
    const text = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(text);
    let newContacts = contacts.filter(c => c.id !== contactId);
    console.log(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts.length === newContacts.length +1;
  } catch(e) {
    console.error(e);
    return false;
  };
}

const addContact = async (name, email, phone) => {
  try{
    const text = await fs.readFile(contactsPath, "utf-8");
  let contacts = JSON.parse(text);
  let id=JSON.stringify(Math.max(...contacts.map(e =>Number(e.id)))+1);
  contacts.push({
    id: id,
    name: name,
    email: email,
    phone: phone
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return id;
  } catch (e) {
    console.error(e);
    return null;
  };
}

const updateContact = async (contactId, body) => {
  try{
  
    let contact = await getContactById(contactId);
    contact = contact[0];

    contact.name = body.name ? body.name : contact.name;
    contact.email = body.email ? body.email : contact.email;
    contact.phone = body.phone ? body.phone : contact.phone;
    await removeContact(contactId);
    let contacts= await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
    } catch (e) {
      console.error(e);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
