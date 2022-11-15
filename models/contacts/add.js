const {nanoid} = require("nanoid"); 
const fs = require("fs/prmises"); 
const dbContactsPath = require("./dbPath");
const get = require("./get");

async function add({name, email, phone}) { 
  const contacts = await get()

  const newContact = {id: nanoid(), name, email, phone};
  contacts.push(newContact);
  await fs.writeFile(dbContactsPath, JSON.stringify(contacts,null,2))
  return newContact;
}
module.exports = add;