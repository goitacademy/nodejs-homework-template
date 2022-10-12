const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")


const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
    const contactById = allContacts.find(el => el.id === contactId)
    return contactById || null
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts()
  const contactIndex = allContacts.findIndex(el => el.id === contactId)
  if (contactIndex === -1) {
      return null
  }
  const [result] = allContacts.splice(contactIndex, 1)
  await updateContacts(allContacts)
  return result
}

const addContact = async ({name, email, phone}) => {
  const allContacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    allContacts.push(newContact)
    await updateContacts(allContacts)
    return newContact

}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  allContacts[index] = {contactId, ...body};
  await updateContacts(allContacts);
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
