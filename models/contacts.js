const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch(err){
    console.log(err)
  }
}

const getContactById = async (contactId) => {
  try{
    const data = await listContacts();
    const result = data.find((item) => item.id === contactId);
    console.log(result);
    return result || null;
  } catch(err){
    console.log(err)
  }
}

const removeContact = async (contactId) => {
  try{
    const data = await listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  }catch(err){
    console.log(err)
  }
}

const addContact = async (body) => {
  try{
  const id = uuidv4();
  const contacts = await listContacts()
  const result = {...body, id}
  contacts.push(result)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}
  catch(err){
    console.log(err)
  }

}

const updateContact = async (contactId, body) => {
  try {
    const result = await listContacts();
    const contactIndex = result.findIndex((item) => item.id === contactId);

    if (contactIndex === -1) {
      return null;
    }

    result[contactIndex] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result[contactIndex];
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
