const fs = require('fs/promises');
const db = require('./db');
const path = require('path');
const colors = require('colors');
const { nextTick } = require('process');
const { ObjectID } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  try {
    const contacts = await getCollection(db, 'contacts');
    const results = await contacts.find({}).toArray();
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    //
    const contacts = await getCollection(db, 'contacts');
    const objectId = new ObjectID(contactId);
    const [results] = await contacts.find({ _id: objectId }).toArray();
    if (!results)
      return console.error(`Пользователя с id ${contactId} не найден`.red);

    return results;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async body => {
  try {
    const record = { ...body };
    const contacts = await getCollection(db, 'contacts');
    const {
      ops: [result],
    } = await contacts.insertOne(record);
    // console.log('name', result.name);
    // console.log('email', result.email);
    // console.log('phone', result.phone);
    // console.log('contacts', contacts.find({ name: { $in: [result.name] } }));
    // TODO добавить проверку на повторение имейла или имени
    console.log(`Пользователь ${name} создан!`.bgBrightWhite.green);
    return result;
    // const contacts = await parsedContact();
    // // const id = nanoid();
    // const { name, email, phone } = body;
    // const replaceContact = contacts
    //   .map(contact => contact.name)
    //   .find(id => id === name);
    // const replaceEmail = contacts
    //   .map(contact => contact.email)
    //   .find(id => id === email);
    // if (replaceContact || replaceEmail) {
    //   return console.error(
    //     `Пользователь с таким именем или email уже создан!`.red,
    //   );
    // }
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getCollection(db, 'contacts');
    const objectId = new ObjectID(contactId);
    const { value: result } = await contacts.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false },
    );
    console.log(`Контакт с id ${contactId} обновлен!`.green);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
const removeContact = async contactId => {
  try {
    const contacts = await getCollection(db, 'contacts');
    const objectId = new ObjectID(contactId);
    const { value: result } = await contacts.findOneAndDelete({
      _id: objectId,
    });
    console.log(`Контакт с id ${contactId} удален!`.green);
    return result;
    // TODO добавить проверку не найден
    // const delContactId = contacts.filter(contact => Number(contact.id) !== id);
    // if (contacts.length === delContactId.length) {
    //   return console.log(`Пользователя с id ${contactId} не найден`.red);
    // }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
