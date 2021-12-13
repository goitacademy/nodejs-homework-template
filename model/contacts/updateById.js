
const listContacts = require("./listContacts")
const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "../contacts.json");


async function updateById(id, data) {
    const contacts = await listContacts();
  
    const idx = contacts.findIndex(el => el.id === id)
console.log(idx)
    if (idx === -1) {
      return null;
    }
    
    contacts[idx] = {id, ...data}
   
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  }

  module.exports = updateById