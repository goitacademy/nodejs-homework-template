const fs = require("fs/promises")

const path = require("path")

const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "contacts.json")


async function updateListContacts(contacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId.toString());
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId.toString());
  console.log(index);
    if(index === -1){
      return null;
    }
  const [result] = contacts.splice(index, 1);
  await updateListContacts(contacts);
  return result;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await updateListContacts(contacts);
  return newContact;
}

const updateContact = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await updateListContacts(contacts);
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
