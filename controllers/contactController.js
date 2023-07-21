const Contact = require('../models/contactModel');
const { catchAsync } = require('../utils');

/**
 * Створити новий контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з даними про новий контакт в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після створення контакту.
 * @throws {Error} - Якщо сталася помилка при створенні контакту.
 */

exports.createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  newContact.password = undefined;

  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});

/**
 * Контролер для отримання ВСІX контактів.
/**
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з даними про контакти в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після отримання контактів.
 * @throws {Error} - Якщо сталася помилка при отриманні контактів.
 */

exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    msg: 'Success',
    contacts,
  });
});

/**
 * Знайти контакт за ідентифікатором.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після знаходження контакту за ідентифікатором.
 * @throws {Error} - Якщо сталася помилка при пошуку контакту.
 */

exports.getOneContact = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

/**
 * Оновити контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентиф контакту у параметрі запиту та даними для оновлення контакту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після оновлення контакту.
 *
 * @throws {Error} - Якщо сталася помилка під час оновлення контакту.
 */

exports.updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );

  res.status(200).json({
    msg: 'Success',
    contact: updatedContact,
  });
});

/**
 * Видалити контакт.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після видалення контакту.
 * @throws {Error} - Якщо сталася помилка при видаленні контакту.
 */

exports.removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});

/**
 * Оновити статус контакту.
 *
 * @async
 * @param {Object} req - Об'єкт запиту Express з ідентифікатором контакту у параметрі запиту та об'єктом `favorite` в тілі запиту.
 * @param {Object} res - Об'єкт відповіді Express для відправки відповіді.
 * @returns {Promise<void>} - Проміс, що вирішується після оновлення статусу контакту.
 *
 * @throws {Error} - Якщо сталася помилка під час оновлення статусу контакту.
 */

exports.updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  // Перевіряємо, чи передано поле 'favorite' в тілі запиту
  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  // Знаходимо контакт за його ідентифікатором і оновлюємо поле 'favorite'
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  // Якщо контакт існує і оновлено успішно, повертаємо його
  if (updatedContact) {
    return res.status(200).json({
      message: 'Success',
      contact: updatedContact,
    });
  }
  // Якщо контакт з таким ідентифікатором не знайдено, повертаємо статус 404 з повідомленням 'Not found'
  return res.status(404).json({ message: 'Not found' });
});
