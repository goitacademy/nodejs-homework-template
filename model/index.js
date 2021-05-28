const db = require("./db"); // подключаем базу данных
const { ObjectId } = require("mongodb"); // вытаскиваем из mongo-драйвера Класс, который будет создавать экземпляр класса

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");

  const objId = new ObjectId(contactId); // вызываем Класс, создаем экземляр класса, в который передаем id. Он будет созавать объект

  const [results] = await collection.find({ _id: objId }).toArray();
  return results;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");

  const objId = new ObjectId(contactId);

  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");

  const newContact = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };

  // в массиве приходит также много разной служебной информации. Деструктуризируем то, что нужно
  const {
    ops: [result],
  } = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");

  const objId = new ObjectId(contactId);

  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body }, // модификатор $set используется, чтобы не перезатирались данные
    { returnOriginal: false } // возвращает обновленные данные
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
