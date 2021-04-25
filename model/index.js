const db = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const resolts = await collection.find().toArray();
  return resolts;
};
const getContactById = async id => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectId(id);
  console.log(objectId.getTimestamp());
  const [resolt] = await collection.find({ _id: objectId }).toArray();

  return resolt;
};
const addContact = async body => {
  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  const collection = await getCollection(db, 'contacts');

  const {
    ops: [resolt],
  } = await collection.insertOne(record);
  return resolt;
};

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  );

  return result;
};
const removeContact = async id => {
  const collection = await getCollection(db, 'contacts');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findAndRemove({ _id: objectId });
  return result;
};

// // const contacts = require('./contacts.json');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const { promises: fsPromise } = fs;

// const contactsPath = path.join(__dirname, '', 'contacts.json');

// const listContacts = () => {
//   try {
//     return fsPromise.readFile(contactsPath).then(data => {
//       return JSON.parse(data);
//     });
//   } catch (err) {
//     errHandle(err);
//   }
// };

// const getContactById = async contactId => {
//   try {
//     const contacts = await listContacts();
//     return contacts.find(({ id }) => id.toString() === contactId.toString());
//   } catch (err) {
//     errHandle(err);
//   }
// };

// const addContact = async body => {
//   try {
//     const contacts = await listContacts();
//     const id = uuidv4();
//     const record = {
//       id,
//       ...body,
//     };

//     contacts.push(record);
//     await fsPromise.writeFile(contactsPath, JSON.stringify(contacts));
//     return record;
//   } catch (err) {
//     errHandle(err);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const contactToUpdate = await getContactById(contactId);

//     const updatedContact = Object.assign(contactToUpdate, body);

//     const updatedContactsList = contacts.filter(
//       ({ id }) => id.toString() !== contactId.toString(),
//     ); // удаляем старый

//     updatedContactsList.push(updatedContact); // пушим новый

//     await fsPromise.writeFile(
//       contactsPath,
//       JSON.stringify(updatedContactsList),
//     );
//     return updatedContact.id ? updatedContact : null;
//   } catch (err) {
//     errHandle(err);
//   }
// };

// const removeContact = async contactId => {
//   try {
//     const contacts = await listContacts();
//     const deletedContact = await getContactById(contactId); // взять все контакты

//     const newList = contacts.filter(
//       ({ id }) => id.toString() !== contactId.toString(),
//     );

//     await fsPromise.writeFile(contactsPath, JSON.stringify(newList));
//     return deletedContact
//       ? { message: 'contact deleted successefull!!' }
//       : null;
//   } catch (err) {
//     errHandle(err); // Функа для обработки ошибок
//   }
// };

// function errHandle(error) {
//   console.log(error.message);
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
