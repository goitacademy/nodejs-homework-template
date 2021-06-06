// папка repositories - это папка для работы с хранилищем
const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "email subscription -_id",
  // }); // чтобы пользователь мог получать только те данные, которые принадлежат ему. populate - свойство, которое видоизменит owner в объект, позволяет связать 2 коллекции, и что не включать в объект;

  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    offset = 0,
  } = query; // limit, offset - всегда приходят в запросе, и которым всегда нужно устанавливать значения по умолчанию. Запрос в базу данных всегда ограничиваем, от возможности положить сервер; sortBy - сортировка по одному столбцу по возрастанию, можно настроить по многим; sortByDesc - сортировка по убыванию; filter - фильтрация по запросу

  const optionSearch = { owner: userId };

  if (favorite !== null) {
    optionSearch.favorite = favorite;
  } // добавляем свойство favorite в query

  const results = await Contact.paginate(optionSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: "name email subscription ",
    },
  }); // обращаемся к модели, к ее свойству paginate, где 1-м параметром будут опции, 2-м - опции настроек самого плагина, т.е. то что искать

  return results;
};

// const listContacts = async () => {
//   const results = await Contact.find(); // получить все контакты
//   return results;
// };

const getContactById = async (userId, contactId) => {
  const results = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription",
  });
  return results;
};

// const getContactById = async (contactId) => {
//   const results = await Contact.findOne({ _id: contactId });
//   return results;
// };

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

// const removeContact = async (contactId) => {
//   const result = await Contact.findOneAndRemove({ _id: contactId });
//   return result;
// };

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

// const addContact = async (body) => {
//   const result = await Contact.create(body);
//   return result;
// };

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

// const updateContact = async (contactId, body) => {
//   const result = await Contact.findOneAndUpdate(
//     { _id: contactId },
//     { ...body },
//     { new: true }
//   );
//   return result;
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
