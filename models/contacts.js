import fs from 'fs/promises';
import path from 'path';

import {
  getId,
  formatEmail,
  formatName,
  formatPhone,
} from '../helpers/helpers.js';

const CONTACTS_PATH = path.resolve('models', 'contacts.json');
const DEF_CHARSET = 'utf-8';

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
 *
 * Перезаписывает файл новыми данными
 * @param {array} data
 */
const flushContacts = async data =>
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(data, null, 2));

/**
 *
 * Добавляет контакт в конец файла
 * @param {object} data
 */
const appendContact = async data => {
  const list = (await getAllContacts()) ?? [];
  await flushContacts([...list, data]);
  return data;
};

/**
 *
 * Проверяет, есть ли контакт с такими данными в БД
 * @param {object} {email, phone}
 * @returns {boolean}
 */
const isContactExists = async ({ email, phone } = {}) => {
  const list = await getAllContacts();
  return list.some(itm => itm.email === email || itm.phone === phone);
};

//////////////////
// Public API
//////////////////

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
 * @returns {object|null} данные успешно добавленного контакта
 *  или null, если контакт с таким email/phone уже есть
 */
export const addContact = async body => {
  // (!) body нужно валидировать перед добавлением
  const { name, email, phone } = body;

  // форматируем данные контакта
  const data = {
    id: getId(),
    name: formatName(name),
    phone: formatPhone(phone),
    email: formatEmail(email),
  };

  // добавляем контакт в БД
  return (await isContactExists(data)) ? null : appendContact(data);
};

/**
 *
 * @param {string} id
 * @param {object} body
 * @returns {object} данные успешно обновленного контакта
 */
export const updateContact = async (id, body) => {
  const list = await getAllContacts();

  // проверяем есть ли контакт с заданным id
  const updatedIndex = list?.findIndex(itm => itm.id === id) ?? -1;
  if (updatedIndex < 0) return null;

  // (!) body нужно валидировать перед добавлением
  const { name, email, phone } = body;
  const curData = list[updatedIndex];

  // обновляем только те поля, для которых заданы валидные значения
  const newData = {
    id,
    name: formatName(name) || curData.name,
    phone: formatPhone(phone) || curData.phone,
    email: formatEmail(email) || curData.email,
  };

  // обновляем БД
  list[updatedIndex] = newData;
  await flushContacts(list);

  return newData;
};
