import fs from 'fs/promises';
import path from 'path';
import * as utils from '../helpers/helpers.js';

const CONTACTS_PATH = path.resolve('models', 'contacts.json');
const DEF_CHARSET = 'utf-8';

//
// helpers
//

/**
 *
 * @param {string} code
 * @param {string} message
 * @returns {Error}
 */
const CustomError = (code, message) => {
  const err = Error(message);
  err.code = code;
  return err;
};

/**
 *
 * @param {string} charset
 * @returns {array|null} массив всех конктов из файла БД
 */
const getAllContacts = async (charset = DEF_CHARSET) => {
  try {
    const data = await fs.readFile(CONTACTS_PATH, charset);
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Перезаписывает файл новыми данными
 * @param {array} data
 */
const flushContacts = async data =>
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(data, null, 2));

/**
 * Проверяет, есть ли контакт с такими данными в БД
 * @param {object} {email, phone}
 * @returns {boolean}
 */
const isContactExists = async ({ email, phone } = {}) => {
  const list = await getAllContacts();
  return list.some(itm => itm.email === email || itm.phone === phone);
};

//
// public API
//

/**
 *
 * @returns {array} массив всех контактов
 */
export const listContacts = async () => await getAllContacts();

/**
 *
 * @param {string} id
 * @returns {object|null} данные контакта с заданным id
 */
export const getContactById = async id => {
  const list = await getAllContacts();
  return list?.find(itm => itm.id === id) ?? null;
};

/**
 *
 * @param {string} id
 * @returns {object|null} данные удаленного контакта
 */
export const removeContact = async id => {
  let removed = null;
  const list = await getAllContacts();

  // удаляем контакт из массива
  const newData = list?.filter(itm => {
    itm.id === id && (removed = itm);
    return itm.id !== id;
  });

  // если контакт успшено удален - сохраняем результат в файл
  if (removed) await flushContacts(newData);

  return removed;
};

/**
 *
 * @param {object} body - добавляемые данные
 * @returns {object} данные успешно добавленного контакта
 */
export const addContact = async body => {
  const list = await getAllContacts();

  // валидация
  try {
    await utils.contactDataScheme.validateAsync(body);
  } catch ({ message }) {
    throw CustomError('ERR_INVALID_DATA', message);
  }

  // форматируем данные контакта
  const { name, email, phone } = body;
  const data = {
    id: utils.getId(),
    name: utils.formatName(name),
    phone: utils.formatPhone(phone),
    email: email.trim(),
  };

  // проверяем наличие контакта в БД
  if (await isContactExists(data)) {
    throw CustomError('ERR_ALREADY_EXISTS', 'Contact already exists');
  }

  // добавляем контакт в БД
  flushContacts([...list, data]);

  return data;
};

export const updateContact = async (id, body) => {};
