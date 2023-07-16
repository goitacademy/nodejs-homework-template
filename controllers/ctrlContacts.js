const modelsContacts = require('../models/contacts');
const { ctrlWrapper } = require('../utils');

/**
 * @ GET /api/contacts
 * нічого не отримує
 * викликає функцію listContacts для роботи з json-файлом contacts.json
 * повертає масив всіх контактів в json-форматі зі статусом 200
 *
 * @param {*} req
 * @param {*} res
 */
const listContacts = async (req, res) => {
  const result = await modelsContacts.listContacts();
  res.status(200).json(result);
};

/**
 *
 *@ GET /api/contacts/:id
 * Не отримує body
 * Отримує параметр id
 * викликає функцію getById для роботи з json-файлом contacts.json
 * якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
 * якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */

module.exports = {
  ctrlListContacts: ctrlWrapper(listContacts),
};
