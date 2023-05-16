const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
      const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

const getContactById = async (id) => {
    const contacts = await getAll()
    return contacts.find(contact => contact.id === id) || null
}

const deleteContact = async (id) => {
  const contactId = String(id)
     const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const contacts = await getAll()
  const { name, email, phone } = body
  const contactId = String(nanoid())
  const newContact = { id: contactId, name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact

}

const updateContact = async (id, data) => {
      const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await updateContacts(contacts);
    return contacts[index];
}

module.exports = {
  getContactById,
  addContact,
  updateContact,
  getAll,
  deleteContact,
}


































// const fs = require('fs/promises')

// const path = require('path')

// const contactsPath = path.join(__dirname, './db/contacts.json')


// const getAll = async () => {
    // const data = await fs.readFile(contactsPath)
    // return JSON.parse(data)
// }

// const getContactById = async (id) => {
    // const contactId = String(id)
    // const contacts = await getAll()
    // return contacts.find(contact => contact.id === contactId) || null

// }§


// const deleteContact = async (id) => {
//     const contactId = String(id)
//      const contacts = await getAll();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// }

// const addContact = async (id, name, email, phone) => {
//     const contactId = String(id)
//     const contacts = await getAll()
//    const newContact = { id: contactId, name, email, phone }
//   contacts.push(newContact)
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
//   return newContact
// }

// module.exports = { 
//     getAll,
//     getContactById,
//     deleteContact,
//     addContact,
// }


