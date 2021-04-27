const fs = require('fs');
const path = require('path');

// const contacts = require('./contacts.json')
// const db = require('./db')

const { promises: fsPromise } = fs;

const writeResult = (result, resultFolder='result', resultFile='') => {
  const resultPath = `./${resultFolder}`;
  fsPromise.writeFile(path.resolve(resultPath, `./${resultFile}.json`), JSON.stringify(result))
}

//'  методы:

//, 1 - лист контактов:
// const listContacts = async () =>  db.get('contacts').value()
const listContacts = async () => contacts.contacts
 //.contacts.contacts - потому, что работал через lowdb и не хотел исправлять...


//, 2 -  получить контакт по ID:
const getContactById = async (contactId) => {
  const getListContacts = await listContacts()
  return  getListContacts.find(({id}) => id.toString() === contactId)
  // const id = Number(contactId);
  // return db.get('contacts').find({id}).value()
}


 //, 3- удалить контакт (по ID):
const removeContact = async (contactId) => {
  if (await getContactById(contactId)) {
    const contactsList = await listContacts();
    contacts['contacts'] = contactsList.filter(({ id }) => id.toString() !== contactId);
    await writeResult(contacts, 'model', 'contacts')
    return true
// const [record] = db.get('contacts').remove({contactId}).write()
// return record
  }
  return false
}

//, 4 - добавить контакт
const addContact = async (body) => {
  const id = uuidv4()
  const record = {
    id,
    ...body,
  }
  contacts.contacts.push(record)
  writeResult(contacts, 'model', 'contacts')
  // db.get('contacts').push(record).write()
  return record
}

  
//, 5 - заменить , изменить свойство в конакте:
const updateContact = async (contactId, body) => {
  // const record = db.get('contacts').find({ id }).assign(body).value()
  // db.write()
  // return record.id? record: null
  const prevRecord = await getContactById(contactId);
  const record = { ...prevRecord, ...body }
  await removeContact(contactId)
  await addContact(record)
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


























// const fs = require('fs');
// const path = require('path');

// // const contacts = require('./contacts.json')
// // const db = require('./db')

// const { promises: fsPromise } = fs;

// const writeResult = (result, resultFolder='result', resultFile='') => {
//   const resultPath = `./${resultFolder}`;
//   fsPromise.writeFile(path.resolve(resultPath, `./${resultFile}.json`), JSON.stringify(result))
// }

// //'  методы:

// //, 1 - лист контактов:
// // const listContacts = async () =>  db.get('contacts').value()
// const listContacts = async () => contacts.contacts
//  //.contacts.contacts - потому, что работал через lowdb и не хотел исправлять...


// //, 2 -  получить контакт по ID:
// const getContactById = async (contactId) => {
//   const getListContacts = await listContacts()
//   return  getListContacts.find(({id}) => id.toString() === contactId)
//   // const id = Number(contactId);
//   // return db.get('contacts').find({id}).value()
// }


//  //, 3- удалить контакт (по ID):
// const removeContact = async (contactId) => {
//   if (await getContactById(contactId)) {
//     const contactsList = await listContacts();
//     contacts['contacts'] = contactsList.filter(({ id }) => id.toString() !== contactId);
//     await writeResult(contacts, 'model', 'contacts')
//     return true
// // const [record] = db.get('contacts').remove({contactId}).write()
// // return record
//   }
//   return false
// }

// //, 4 - добавить контакт
// const addContact = async (body) => {
//   const id = uuidv4()
//   const record = {
//     id,
//     ...body,
//   }
//   contacts.contacts.push(record)
//   writeResult(contacts, 'model', 'contacts')
//   // db.get('contacts').push(record).write()
//   return record
// }

  
// //, 5 - заменить , изменить свойство в конакте:
// const updateContact = async (contactId, body) => {
//   // const record = db.get('contacts').find({ id }).assign(body).value()
//   // db.write()
//   // return record.id? record: null
//   const prevRecord = await getContactById(contactId);
//   const record = { ...prevRecord, ...body }
//   await removeContact(contactId)
//   await addContact(record)
//   return record.id ? record : null
// }




