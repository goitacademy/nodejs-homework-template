const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // * Извлекаем id пользователя в переменную owner, чтобы найти все контакты у которых владелец тот кто делает запрос

  const { page = 1, limit = 10 } = req.query;
  // * Параметры запроса находяться в req.query

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "name email phone", {
    skip, // * skip это сколько пропустить сначала колекции
    limit, // * limit это сколько извлеч из колекции
  }).populate("owner", "email"); // * В populate пишем поле в котором есть id, mongoos идет в поле которое записано в ref, находит об"ект с таким id и вписывает его в owner
  // * "name email phone" использовать для выбора передачи полей,
  // * если передать все кроме каких-то использовать "-", например -id, -name
  res.json(result);
};

module.exports = getContacts;
