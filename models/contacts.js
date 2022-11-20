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
const uniqid = require('uniqid'); //! +++

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
const getUsersList = async (showListAllUsers = 1) => {
  const users = JSON.parse(await fs.readFile(contactsPath, 'utf8'));

  //! ===========================console============================
  if (showListAllUsers === 1) {
    console.log("СПИСОК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ:".bgGreen.black)
  };
  console.table(users);
  lineBreak();
  //! ==============================================================

  return users;
};


//todo   ----------------------------  2. Создание НОВОГО списка ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ----------------------------
const writeUsers = async (users) => {
  await fs.writeFile(contactsPath, JSON.stringify(users), 'utf8');

  //! ===========================console============================
  if (users.length !== 0) {
    console.log("СПИСОК НОВЫХ ПОЛЬЗОВАТЕЛЕЙ:".bgCyan.red); //!+++
    await getUsersList(0)
  };
  //! ==============================================================

  return users;
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
  console.log("START-->GET/:id".blue); //!
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
// //? 3: Добавляем КОНТАКТ (АСИНХРОННЫЙ вариант-2)
// async function addContact(name, email, phone) {
//   try {
//     //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
//     const contactsParse = await listContacts();

//     //! Создаем НОВЫЙ КОНТАКТ ==> newContact
//     const newContact = {
//       // id: Date.now(),
//       // id: v4(),
//       id: uniqid(),
//       name,
//       email,
//       phone
//     };
//     // console.log("НОВЫЙ КОНТАКТ:".yellow, newContact); //!+++

//     //!!! КОНСОЛИМ НОВЫЙ КОНТАКТ как МАССИВ из одного элемента  ==> МАССИВ c ОДНИМ ОБЪЕКТОМ
//     const newContactArr = [newContact];
//     console.log(`НОВЫЙ КОНТАКТ №_${newContact.id}:`.yellow); //!+++
//     console.table(newContactArr); //!+++
//     lineBreak();

//     //!!! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
//     const contactsParseNew = [...contactsParse, newContact];

//     console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
//     console.table(contactsParseNew); //!+++ 1-й вариант
//     console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParseNew).red);
//     lineBreak();

//     //! Вызываем ф-цию creatingNewJSONfile()  ==>
//     //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
//     //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
//     await creatingNewJSONfile(contactsParseNew);

//   } catch (error) {
//     console.error(error.message.red);
//     lineBreak();
//   };
// };

//! 3. Создание НОВОГО КОНТАКТА
// async function addContact({ name, email, phone }) {
async function addContact(body) {
  // const body = req.body; //! в index1.js ==> app.use(express.json());
  const { name, email, phone } = body;
  console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
  console.log("");
  console.log("name:".bgYellow.black, name.yellow); //!
  console.log("email:".bgYellow.black, email.yellow); //!
  console.log("phone:".bgYellow.black, phone.yellow); //!
  lineBreak();


  //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
  const contactsParse = await listContacts();

  //! Создаем НОВЫЙ КОНТАКТ ==> newContact
  const newContact = {
    // id: Date.now(),
    // id: v4(),
    id: uniqid(),
    name,
    email,
    phone
  };
  // console.log("НОВЫЙ КОНТАКТ:".yellow, newContact); //!+++

  //!!! КОНСОЛИМ НОВЫЙ КОНТАКТ как МАССИВ из одного элемента  ==> МАССИВ c ОДНИМ ОБЪЕКТОМ
  const newContactArr = [newContact];
  console.log(`НОВЫЙ КОНТАКТ №_${newContact.id}:`.yellow); //!+++
  console.table(newContactArr); //!+++
  lineBreak();

  //!!! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
  const contactsParseNew = [...contactsParse, newContact];

  console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
  console.table(contactsParseNew); //!+++ 1-й вариант
  console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParseNew).red);
  lineBreak();

  //! Вызываем ф-цию creatingNewJSONfile()  ==>
  //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
  //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
  await creatingNewJSONfile(contactsParseNew);

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
  removeContact,
  // updateContact,
  // patchContact,
  // removeAllContacts
};