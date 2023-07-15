const Joi = require("joi");
const path = require("path");
const { httpError, ctrlWrapper } = require("../helpers");
const {Contact} = require(path.resolve(__dirname, "../models/contact"));

const getAll = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

// const getById = async (req, res) => {
//   const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
//   const contactById = await getContactById(contactId);
//   if (!contactById) {
//     throw httpError(404, "Not found");
//   }
//   res.status(200).json(contactById);
// };

const add = async (req, res) => {
  console.log('req.body', req.body)
  const result = await Contact.create(req.body);
  console.log('result', result)
  res.status(201).json(result);
};

// const deleteById = async (req, res) => {
//   const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
//   const removedById = await removeContact(contactId);

//   if (!removedById) {
//     throw httpError(404, "Not found");
//   }
//   res.json({
//     message: "Delete success",
//   });
// };

// const updateContactById = async (req, res) => {
//   const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
//   const { name, email, phone } = req.body; // Извлекаем данные из тела запроса

//   const newContact = { name, email, phone }; // Создаем объект newContact

//   const updatedContact = await updateContact(contactId, newContact); // Передаем параметры contactId и newContact
//   if (!updatedContact) {
//     throw httpError(404, "Not found");
//   }

//   res.json(updatedContact);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
  // updateContactById: ctrlWrapper(updateContactById),
};