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

const Joi = require('joi');
// import { nanoid } from 'nanoid';
// const nanoid = require('nanoid');
const { v4 } = require('uuid');
const uniqid = require('uniqid');
const { randomUUID } = require("crypto"); //! +++

const { lineBreak } = require("../service");


//------------------------------------------------------------------------------------------------
// TODO: ------------------------ Определяем путь к файлу  contacts.json ------------------------
const contactsPath = path.join(__dirname, "/../models/contacts.json");
lineBreak();
// console.log("contactsPath:".red, contactsPath.green); //!
console.log("contactsPath:".bgBlue.yellow, contactsPath.blue); //!
lineBreak();



// const userPath = path.join(__dirname, "/../models/contacts.json");
// lineBreak();
// console.log("userPath:".bgBlue.yellow, userPath.blue);
// lineBreak();
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


//todo ------------------------------------------------ ВСПОМОГАТЕЛЬНЫЕ ФУНЦИИ-ВЫЗЫВАЛКИ_OLD ------------------------------------------------
// //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
// //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
// async function creatingNewJSONfile(contactsParseNew) {
//   //!  Преобразовываем НОВЫЙ  МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
//   const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
//   console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
//   console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
//   lineBreak();

//   //!  Записываем НОВЫЙ JSON в файл contacts.json и получаем  ==> НОВЫЙ contacts.json
//   await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
//   const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
//   console.log("НОВЫЙ contacts.json:\n".yellow, contactsNEWjson.blue); //!
//   console.log("typeof (НОВЫЙ contacts.json):".yellow, (typeof contactsNEWjson).red); //!
//   lineBreak();
// };
//todo _________________________________________________________________________________________________________________





// ----------------------------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
async function listContacts() {
  console.log("START-->GET/All".green); //!

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

  //! ===========================console============================
  if (!contact) {
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
    lineBreak();
    console.log("END-->GET/:id".blue); //!
    return contact;
  };
  console.log(`ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.bgBlue.yellow); //!
  console.table([contact]); //!
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

  const { name, email, phone } = body;

  //! ===========================console============================
  console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
  console.log("");
  console.log("name:".bgYellow.black, name.yellow); //!
  console.log("email:".bgYellow.black, email.yellow); //!
  console.log("phone:".bgYellow.black, phone.yellow); //!
  lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const contact = { id: randomUUID().slice(-12), ...body };

  //! ===========================console============================
  console.log(`НОВЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contact.id}:`.bgYellow.blue); //!
  console.table([contact]); //!
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
  console.log("START-->PUT/:id".rainbow); //!
  lineBreak();
  //! ==============================================================

  const contacts = await getUsersList();
  const index = contacts.findIndex(contact => String(contact.id) === contactId);

  if (index === -1) {
    console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, id.red); //!
    lineBreak();
    console.log("END-->PUT/:id".rainbow); //!
    const contact = null
    return contact;
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

  //! Проверка contactId на чило/строка
  let contact = null;
  if (isNaN(Number(contactId))) {
    // console.log("id:", id); 
    contact = { contactId, ...body }
  } else {
    contact = { contactId: Number(contactId), ...body };
  }

  //! ===========================console============================
  console.log(`ОБНОВЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.rainbow); //!
  console.table([contact]); //!
  //! ==============================================================

  contacts.splice(index, 1, contact);
  await writeUsers(contacts);

  console.log("END-->PUT/:id".rainbow); //!

  return contact;
};












// ----------------------------------------------------------------------------------
//? 4: Удаляем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function removeContact(contactId) {
  try {
    //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
    const contactsParse = await listContacts();

    //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
    const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId)); //* - это МАССИВ с одним ОБЪЕКТОМ
    if (contactsParseByIdArr.length === 0) {
      console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
      lineBreak();
      return;
    };

    console.log(`Этот КОНТАКТ №_${contactId} будет удален:`.yellow); //!+++
    console.table(contactsParseByIdArr); //!+++
    lineBreak();

    //!!! УДАЛЯЕМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
    const contactsParseNew = contactsParse.filter(contact => String(contact.id) !== String(contactId));
    console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
    console.table(contactsParseNew); //!+++
    console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    lineBreak();

    //! Вызываем ф-цию creatingNewJSONfile()  ==>
    //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    await creatingNewJSONfile(contactsParseNew);

  } catch (error) {
    console.error(error.message.red);
    lineBreak();
  };
};

//! ________________________________________________________________________________________________________

//! Экспорт функций
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updatePutContact,
  // updatePatchContact,
  removeContact,
  // removeAllContacts
};