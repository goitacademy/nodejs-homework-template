const Contact = require("./schemas/contact");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

const listContacts = async () => {
  const results = await Contact.find({}); //мангус за нас распарсит в массив

  return results;
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  // const record = {
  //   ...body,
  // };
  // const collection = await getCollection(db, "contacts");
  // const {
  //   ops: [result],
  // } = await collection.insertOne(record); //insertOne - вставка одной записи в бд
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objectId },
  //   { $set: body },
  //   { returnOriginal: false } //чтоб не возвращало оригинальный объект, а уже с апдейтом
  // );
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return result;
};

const removeContact = async (contactId) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndDelete({
  //   _id: objectId,
  // });
  // return result;

  const result = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
