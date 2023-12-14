const { Contact } = require("../models/contact");

const { catchAsync, ctrlWrapper } = require("../helpers"); // імпортуємо помилку для прокидування

// const { schemas } = require("../../models/contact");

// ф-ції, які підключаються до необхідних ф-цій з models і повертають необхідні дані:
// усі контакти, або контакт по id, або заміняють, видаляють, додають контакт

// витягуємо усі контакти
const getAll = catchAsync(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// витягуємо контакт по id
const getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  res.status(200).json(contact);
});

// добавляємо контакт
const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// поновити контакт по id
const updateById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  2;

  res.status(200).json(result);
});

// видалити контакт по id
const deleteById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  res.sendStatus(204);
});

const updateStatusContact = async(req, res) => {
 
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  const result = await Contact.findByIdAndUpdate(contactId, { favorite: !contact.favorite }, { new: true });
 
  res.status(200).json({ data: req.body, message: `${contactId}` });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
