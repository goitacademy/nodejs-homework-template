// todo --> START ++++++++++++++++++++++++++++++++++++++++++++++++
// // const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
// todo _____________________________________________________________


const fs = require("fs/promises");
const path = require('path');
require('colors');

const { randomUUID } = require("crypto"); //! +++
const { v4 } = require('uuid');
const uniqid = require('uniqid');

const Joi = require('joi');


const { lineBreak } = require("../service");


//------------------------------------------------------------------------------------------------
// TODO: ------------------------ Определяем путь к файлу  contacts.json ------------------------
const contactsPath = path.join(__dirname, "/../models/contacts.json");
lineBreak();
// console.log("contactsPath:".red, contactsPath.green); //!
console.log("contactsPath:".bgBlue.yellow, contactsPath.blue); //!
lineBreak();
// TODO: _________________________________________________________________________________________



//!* ------------------------------------------------ ВСПОМОГАТЕЛЬНЫЕ ФУНЦИИ-ВЫЗЫВАЛКИ_new ------------------------------------------------
//todo   ----------------------------  1. Получение списка ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ----------------------------
const getUsersList = async (showListAllСontacts = 1) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));

  //! ===========================console============================
  if (showListAllСontacts === 1) {
    console.log("СПИСОК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ:".bgGreen.black)
  };
  console.table(contacts);
  lineBreak();
  //! ==============================================================

  return contacts;
};


//todo   ----------------------------  2. Создание НОВОГО списка ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ----------------------------
const writeUsers = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');

  //! ===========================console============================
  if (contacts.length !== 0) {
    console.log("СПИСОК НОВЫХ ПОЛЬЗОВАТЕЛЕЙ:".bgCyan.red); //!+++
    await getUsersList(0)
  };
  //! ==============================================================

  return contacts;
  // return await fs.writeFile(contactsPath, JSON.stringify(users));
};
//* ____________________________________________________________________________________________________________________



// ----------------------------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
async function listContacts() {
  //! ===========================console============================
  console.log("START-->GET/All".green); //!
  lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();

  console.log("END-->GET/All".green); //!

  return contacts;
};



// ----------------------------------------------------------------------------------
//! 2. Получение ОДНОГО КОНТАКТА по id
async function getContactById(contactId) {
  //! ===========================console============================
  console.log("START-->GET/:id".blue); //!
  lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const [contact] = contacts.filter(contact => String(contact.id) === contactId); //* - это УЖЕ ОБЪЕКТ


  if (!contact) {
    //! ===========================console============================
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
    lineBreak();
    console.log("END-->GET/:id".blue); //!
    //! ==============================================================
    return null;
  };

  //! ===========================console============================
  console.log(`ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.bgBlue.yellow); //!
  console.table([contact]); //!
  lineBreak();
  console.log("END-->GET/:id".blue); //!
  //! ==============================================================

  return contact;
};



// ----------------------------------------------------------------------------------
//! 3. Создание НОВОГО КОНТАКТА
async function addContact(body) {
  //! ===========================console============================
  // console.log("START-->POST".yellow); //!
  // lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const contact = { id: randomUUID().slice(-12), ...body };
  const { name, email, phone } = body;

  //! ===========================console============================
  console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
  console.log("");
  console.log("name:".bgYellow.black, name.yellow); //!
  console.log("email:".bgYellow.black, email.yellow); //!
  console.log("phone:".bgYellow.black, phone.yellow); //!
  lineBreak();

  console.log(`НОВЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contact.id}:`.bgYellow.blue); //!
  console.table([contact]); //!
  lineBreak();
  //! ==============================================================

  contacts.push(contact);
  await writeUsers(contacts);

  console.log("END-->POST".yellow); //!

  return contact;
};



// ----------------------------------------------------------------------------------
//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
async function updatePutContact(contactId, body) {
  //! ===========================console============================
  // console.log("START-->PUT/:id".rainbow); //!
  // lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const index = contacts.findIndex(contact => String(contact.id) === contactId);

  if (index === -1) {
    //! ===========================console============================
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
    lineBreak();
    console.log("END-->PUT/:id".rainbow); //!
    //! ==============================================================
    return null;
  };

  const { name, email, phone } = body;

  //! ===========================console============================
  console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
  console.log("");
  console.log("name:".bgYellow.black, name.yellow); //!
  console.log("email:".bgYellow.black, email.yellow); //!
  console.log("phone:".bgYellow.black, phone.yellow); //!
  lineBreak();
  //! ==============================================================

  //! Обновляем данные КОНТАКТА (1 - вариант)
  //? Проверка contactId на число/строка
  let contact = null;
  if (isNaN(Number(contactId))) {
    // console.log("contactId:", contactId); //!
    contact = { id: contactId, ...body }
  } else {
    contact = { id: Number(contactId), ...body };
  }

  //! Обновляем данные КОНТАКТА (2 - вариант)
  // const contact = { ...contacts[index], ...body };

  //! ===========================console============================
  console.log(`ОБНОВЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.rainbow); //!
  console.table([contact]); //!
  lineBreak();
  //! ==============================================================

  contacts.splice(index, 1, contact);
  await writeUsers(contacts);

  console.log("END-->PUT/:id".rainbow); //!

  return contact;
};



// ----------------------------------------------------------------------------------
//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
async function updatePatchContact(contactId, body) {
  //! ===========================console============================
  // console.log("START-->PATCH/:id".rainbow); //!
  // lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const index = contacts.findIndex(contact => String(contact.id) === contactId);

  if (index === -1) {
    //! ===========================console============================
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, id.red); //!
    lineBreak();
    console.log("END-->PATCH/:id".rainbow); //!
    //! ==============================================================
    return null;
  };

  const { name, email, phone } = body;

  //! ===========================console============================
  console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
  console.log("");
  if (name) console.log("name:".bgYellow.black, name.yellow); //!
  if (email) console.log("email:".bgYellow.black, email.yellow); //!
  if (phone) console.log("phone:".bgYellow.black, phone.yellow); //!
  lineBreak();
  console.log("Обновляем ТОЛЬКО ЭТИ поля:".bgGreen.red, body);
  lineBreak();
  //! ==============================================================

  //! Обновляем данные КОНТАКТА (2 - вариант)
  const contact = { ...contacts[index], ...body };

  //! ===========================console============================
  console.log(`ОБНОВЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.rainbow); //!
  console.table([contact]); //!
  lineBreak();
  //! ==============================================================

  contacts.splice(index, 1, contact);
  await writeUsers(contacts);

  console.log("END-->PATCH/:id".rainbow); //!

  return contact;
};



// ----------------------------------------------------------------------------------
//! 5. Удаление ОДНОГО КОНТАКТА по id
async function removeContact(contactId) {
  //! ===========================console============================
  console.log("START-->DELETE/:id".red); //!
  lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const [deletedContact] = contacts.filter(contact => String(contact.id) === contactId); //* - это ОБЪЕКТ c удаленным Contact
  const filteredContacts = contacts.filter(contact => String(contact.id) !== contactId); //* - это МАССИВ ОБЪЕКТОB НОВЫХ Contacts

  if (filteredContacts.length === contacts.length) {
    //! ===========================console============================
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
    lineBreak();
    console.log("END-->GET/:id".blue); //!
    //! ==============================================================
    return null;
  };

  //! ===========================console============================
  console.log(`Этот ПОЛЬЗОВАТЕЛЬ с ID: ${contactId} УДАЛЕН:`.bgRed.yellow); //!
  console.table([deletedContact]); //!
  lineBreak();
  //! ==============================================================

  await writeUsers(filteredContacts);

  console.log("END-->DELETE/:id".red); //!

  return deletedContact;
};



// ----------------------------------------------------------------------------------
//! 6. Удаление ВСЕХ КОНТАКТОВ
async function removeAllContacts(contactId) {
  //! ===========================console============================
  console.log("START-->DELETE/All".bgRed.yellow); //!
  lineBreak();
  console.log("ВСЕ ПОЛЬЗОВАТЕЛИ УДАЛЕНЫ...".bgRed.white); //!
  //! ==============================================================

  const contacts = await writeUsers([]);

  //! ===========================console============================
  lineBreak();
  console.log("END-->DELETE/All".bgRed.yellow); //!
  //! ==============================================================

  return contacts
};
// ________________________________________________________________________________________________________


//! Экспорт ВСЕХ функций:
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updatePutContact,
  updatePatchContact,
  removeContact,
  removeAllContacts
};