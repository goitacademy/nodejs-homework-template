
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const {ObjectID}=require('mongodb')



const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection;
}


//, 1 - лист контактов:
const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find().toArray()
  return results
}


 //, 4 - добавить контакт
const addContact = async (body) => {
 const id = uuidv4()
  const record = {
    id,
    ...body,
  }
  const collection = await getCollection(db, 'contacts')
  const {ops:[results]} = await collection.insertOne(record)
  return results
}


//, 2 -  получить контакт по ID:
const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectID(contactId)
  console.log('метка создания ID на сервере (не на браузере, не на локальном хосте ', objectId.getTimestamp());
  const [result] = await collection.find({_id:objectId}).toArray()
  return result
}


 //, 3- удалить контакт (по ID):
const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectID(contactId)
  const {value:result} = await collection.findOneAndDelete({_id:objectId})
return result
}

//, 5 - заменить , изменить свойство в конакте:
const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = ObjectID(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    {returnOriginal:false}
  )
return result

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




