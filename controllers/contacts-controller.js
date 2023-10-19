import { HttpError } from "../helpers/index.js";
import {
  movieAddSchema,
  movieUpdateSchema,
} from "../schemas/contacts-schemas.js";

// import { contactsOperations } from "../models/contacts.js";
import contactsOperations from "../models/contacts.js";
// import * as contactsOperations from "../models/contacts.js";
import { ctrlWrapper } from "../decorators/index.js";

// схема валідації контакту  - створюємо для цього джоі схему (опис як повинен виглядати об'єкт) на додавання контакту
// const movieAddSchema = Joi.object({
// id: Joi.string().required(),
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(), //можно далі ще текст помилки (месседж) додати, який буде потім повертатися
// });

const getAll = async (req, res, next) => {
  const result = await contactsOperations.listContacts();
  res.json(result);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

// дописуємо next як третій аргумент. Що він робить -
// 1) ящоко в некст всередині функції викликати без аргументів (next()), то від далі буде шукати підходящий обробник
// 2) якщо в Некст викликати з агрументом (з об'єктом err наприклад) next(err), то він буде шукати обробник для помилки - а це мідлвара, яка має 4ри аргументи.
const getById = async (req, res) => {
  // try {
  // Считуємо з параметрів ІД з URL
  // const contactId = req.params.contactId;
  const { contactId } = req.params;
  const contactList = await contactsOperations.getContactById(contactId);
  if (!contactList) {
    // !: Variant 3 (after optimization)
    throw HttpError(404, `Can't find such Contact ${contactId}`);
    // * Variant 2
    // const err = new Error.apply(`Can't find such Contact ${contactId}`);
    // тут просто створюємо код для помилки, статус помилки. А відправляємо на фрнтенд в Кетчі.
    // err.status = 404;
    // throw err;
    // * Variant 1
    //  wew
    // return res.status(404).json({
    //   message: `Can't find such Contact ${contactId}`,
    // });
  }
  res.json(contactList);
  // } catch (err) {
  //   next(err);
  // Якщо невідома помилка, не 404, то присвоюємо їй код 500. Деструктуризація 2х змінних
  // const { status = 500, message } = err;
  // res.status(status).json({ message: err.message });
  // }
};

const addContact = async (req, res) => {
  // try {
  const newContact = await contactsOperations.addContact(req.body);
  // Надо перевіряти данні (тіло) перед тим, як зберігати данні у сховище. Наприклад, що тайтл точно вказаний
  // Joi - ваділує ці данні, це схоже на yap.

  // * Виносим в Роути цю валідацію по схемі
  // const validataResult = movieAddSchema.validate(req.body); //тут на джой-схемі викликаємо метод валідейт і передаємо тіло.
  // Схема перевіряє чи відповідає об'єкт вимогам, по результату повертається об'єет резалт.
  // const { error } = validataResult; //можно одразу на попередньому запиті деструктуризувати
  // if (error) {
  //   throw HttpError(400, error.message);
  // }

  // TODO: було до того
  // if (!newContact) {
  //   throw HttpError(404, `Can't add new contact`);
  // }

  // 201 статус успішного додавання
  res.status(201).json(newContact);
  // } catch (err) {
  //   next(err);
  // }
};

const updateContactById = async (req, res) => {
  // * Перенесли в проміжку мідлвару в роути
  // const { error } = movieUpdateSchema.validate(req.body); //тут на джой-схемі викликаємо метод валідейт і передаємо тіло.
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { contactId } = req.params;
  const updateResult = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updateResult) {
    throw HttpError(400, `Contacts with ${contactId} not found(.`);
  }
  res.json(updateResult);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const removeContactResult = await contactsOperations.removeContact(contactId);
  if (!removeContactResult) {
    throw HttpError(400, `Contacts with ${contactId} not found(.`);
  }
  res.json({ message: `Contact ${contactId} deleted` });
  // res.status(204).send() не отправляет бади?
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
