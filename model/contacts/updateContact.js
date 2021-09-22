const listContacts = require('./listContacts')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString(),
  )
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...body }
  contacts.push(updateContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return updateContact
}

module.exports = updateContact

// ===== также можно записать ====
//
//  === Cоздать отдельно ф-цию для обновлния всех контактов
//
// const fs = require("fs/promises");
// const path = require("path");

// const contactsPath = path.join(__dirname, "contacts.json");

// const updateContacts = async(newContacts) => {
//     await fs.writeFile(contactsPath, JSON.stringify(newContacts));
// };

// module.exports = updateContacts;
//
// == и записать саму функцию по обновлению контакта по Id

// const updateContacts = require("./updateContacts");
// const getAll = require("./getAll");

// const updateContactById = async(id, data) => {
//     const contacts = await getAll();
//     const idx = contacts.findIndex(item => item.id === id);
//     if(idx === -1){
//         return null;
//     }
//     const updateContact = {...contacts[idx], ...data};
//     contacts[idx] = updateContact;
//     await updateContacts(contacts);
//     return updateContact;
// };
//
//    module.exports = updateContactById;
