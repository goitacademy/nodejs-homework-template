const Contact = require("./schemas/contactSchema");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

const listContacts = async (
  userId,
  {
    sortBy,
    sortByDesc,
    filter,
    limit = "5",
    // offset = "0",
    page = "1",
  }
) => {
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "email subscription", //если нужно исключить поле, -_id , например
  // }); //мангус за нас распарсит в массив

  // return results;
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      // offset,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "email subscription",
      },
    }
  );
  const { docs: contacts, totalDocs: total } = results;
  return {
    total: total.toString(),
    limit,
    // offset,
    page,
    contacts,
  };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription", //если нужно исключить поле, -_id например
  });
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

const updateContact = async (contactId, body, userId) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objectId },
  //   { $set: body },
  //   { returnOriginal: false } //чтоб не возвращало оригинальный объект, а уже с апдейтом
  // );
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const removeContact = async (contactId, userId) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(contactId);
  // const { value: result } = await collection.findOneAndDelete({
  //   _id: objectId,
  // });
  // return result;

  const result = await Contact.findByIdAndRemove({
    _id: contactId,
    owner: userId,
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
