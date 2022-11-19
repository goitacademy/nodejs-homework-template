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


require('colors');

// const fs = require('fs'); //? АСИНХРОННЫЙ вариант-1
// const fs = require('fs').promises; //! АСИНХРОННЫЙ вариант-2
const fs = require("fs/promises"); //! АСИНХРОННЫЙ вариант-2

const path = require('path');

// import { nanoid } from 'nanoid';
// const nanoid = require('nanoid');

const { v4 } = require('uuid');
const uniqid = require('uniqid');

// const { lineBreak } = require("./service");
const { lineBreak } = require("../service");



//!* ------------------------------------------------ ФУНЦИИ-ВЫЗЫВАЛКИ ------------------------------------------------
//! ------------------------------------- Разделительная линия -------------------------------------
// function lineBreak() {
//     const newline = "----------------------------------------------------------------------------------------------------------------------\n";
//     console.log(newline);
// }

//! -------------------------------------------------------------------------------------------------------------
//!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
//!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
async function creatingNewJSONfile(contactsParseNew) {
  //!  Преобразовываем НОВЫЙ  МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
  const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
  console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
  console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
  lineBreak();

  //!  Записываем НОВЫЙ JSON в файл contacts.json и получаем  ==> НОВЫЙ contacts.json
  // await fs.writeFile('./db/contactsNEW.json', contactsParseNewStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в файл contacts.json
  await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
  // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
  const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
  console.log("НОВЫЙ contacts.json:\n".yellow, contactsNEWjson.blue); //!
  console.log("typeof (НОВЫЙ contacts.json):".yellow, (typeof contactsNEWjson).red); //!
  lineBreak();
};
//* _________________________________________________________________________________________________________________



// TODO: ------------------------ Раскомментируй и запиши значение - ТЗ ------------------------
// const contactsPath = path.resolve('./db/contacts.json');
const contactsPath = path.join(__dirname, "/../models/contacts.json");
// console.log(`contactsPath:  ${contactsPath}`.red); //!
lineBreak();
// console.log("contactsPath:".red, contactsPath.green); //!
console.log("contactsPath:".bgBlue.yellow, contactsPath.blue); //!
lineBreak()





// TODO: ------------------------ Задокументировать каждую функцию - ТЗ  ------------------------
//? 1: Получаем ВСЕ КОНТАКТЫ (АСИНХРОННЫЙ вариант-1)
// function listContacts() {
//     // fs.readFile('./db/contacts.json', 'utf8', (error, data) => {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error read file contacts.json:'.red, error.red);
//         }
//         console.log("contacts.json:".yellow, data.blue);
//     })
// };


// ----------------------------------------------------------------------------------
//! 1: Получаем ВСЕ КОНТАКТЫ (АСИНХРОННЫЙ вариант-2)
async function listContacts() {
  try {
    //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
    const data = await fs.readFile(contactsPath, 'utf8');
    console.log("contacts.json:\n".yellow, data.blue); //!
    console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
    lineBreak();

    //!!! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
    const contactsParse = JSON.parse(data);
    // console.log("СПИСОК КОНТАКТОВ:".yellow, contactsParse); //!+++
    console.log("СПИСОК КОНТАКТОВ:".yellow); //!+++
    console.table(contactsParse); //!+++
    console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    lineBreak();
    return contactsParse;

  } catch (error) {
    console.error(error.message.red);
    lineBreak();
  }
}

// ----------------------------------------------------------------------------------
//? 2: Получаем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-1)
// function getContactById(contactId) {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error read file contacts.json:'.red, error.red);
//         }
//         //! Получаем значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
//         console.log("contacts.json:".yellow, data.blue); //!
//         console.log("typeof data:".yellow, (typeof data).red);

//         //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
//         const contactsParse = JSON.parse(data);
//         console.log("contactsParse:".yellow, contactsParse); //!
//         console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

//         //! ПАРСИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
//         console.log("contactId:", contactId);
//         const contactsParseByContactId = JSON.parse(data)[contactId - 1];
//         console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
//         console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
//     })
// }



// ----------------------------------------------------------------------------------
//! 2: Получаем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function getContactById(contactId) {
  try {
    // // ? TEST - ПАРСИМ и КОНСОЛИМ значение файла package.json  ==> package.json + devDependencies
    // // const data = await fs.readFile('./package.json', 'utf8'); //! +++
    // // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
    // // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

    // ! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
    // const data = await fs.readFile(contactsPath, 'utf8');
    // console.log("contacts.json:\n".yellow, data.blue); //!
    // console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
    // lineBreak();

    // //! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
    // const contactsParse = JSON.parse(data);
    // // console.log("contactsParse:".yellow, contactsParse); //!
    // console.log("СПИСОК КОНТАКТОВ:".yellow); //!
    // console.table(contactsParse); //!
    // console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    // lineBreak();

    // // ? ПАРСИМ и КОНСОЛИМ только один элемент МАССИВА (по ИНДЕКС = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
    // // console.log("contactId:", contactId);
    // // const contactsParseByContactId = JSON.parse(data)[contactId - 1];
    // // console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
    // // console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
    // // lineBreak();

    //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
    const contactsParse = await listContacts();

    //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
    const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId)); //* - это МАССИВ с одним ОБЪЕКТОМ
    if (contactsParseByIdArr.length === 0) {
      console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
      lineBreak();
      return;
    }

    // const contactsParseByIdArr = contactsParse.find(contact => String(contact.id) === String(contactId)); //? - это ОБЪЕКТ
    // if (!contactsParseByIdArr) {
    //     console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
    //     lineBreak();
    //     return;
    // }

    // const contactsParseById = contactsParseByIdArr[0]; 
    // console.log("Этот контакт будет удален:".yellow, contactsParseById); //!+++
    console.log(`КОНТАКТ №_${contactId}:`.yellow); //!+++
    console.table(contactsParseByIdArr); //!+++
    // console.log(contactsParseByIdArr); //!+++
    lineBreak();

  } catch (error) {
    console.error(error.message.red);
    lineBreak();
  }
}


// ----------------------------------------------------------------------------------
//! 3: Удаляем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function removeContact(contactId) {
  try {
    // //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
    // const data = await fs.readFile(contactsPath, 'utf8');
    // console.log("contacts.json:\n".yellow, data.blue); //!
    // console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
    // lineBreak();

    // //! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
    // const contactsParse = JSON.parse(data);
    // // console.log("contactsParse:".yellow, contactsParse); //!
    // console.log("СПИСОК КОНТАКТОВ:".yellow); //!
    // console.table(contactsParse); //!
    // console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    // lineBreak();

    // // ? ПАРСИМ и КОНСОЛИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
    // // console.log("contactId:", contactId);
    // // const contactsParseByContactId = JSON.parse(data)[contactId - 1];
    // // console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
    // // console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
    // // lineBreak();

    //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
    const contactsParse = await listContacts();

    //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
    const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId)); //* - это МАССИВ с одним ОБЪЕКТОМ
    if (contactsParseByIdArr.length === 0) {
      console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
      lineBreak();
      return;
    }

    // const contactsParseById = contactsParseByIdArr[0]; 
    // console.log("Этот контакт будет удален:".yellow, contactsParseById); //!+++
    console.log(`Этот КОНТАКТ №_${contactId} будет удален:`.yellow); //!+++
    console.table(contactsParseByIdArr); //!+++
    lineBreak();

    //!!! УДАЛЯЕМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
    const contactsParseNew = contactsParse.filter(contact => String(contact.id) !== String(contactId));
    // console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow, contactsParseNew); //!+++
    console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
    console.table(contactsParseNew); //!+++
    console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    lineBreak();

    //! Вызываем ф-цию creatingNewJSONfile()  ==>
    //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    await creatingNewJSONfile(contactsParseNew);

    // //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    // const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
    // console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
    // console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
    // lineBreak();

    // //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    // // await fs.writeFile('./db/contactsNEW.json', contactsParseNewStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
    // await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
    // // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
    // const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
    // console.log("НОВЫЙ JSON-файл --> contacts.json:\n".yellow, contactsNEWjson.blue); //!
    // lineBreak();

  } catch (error) {
    console.error(error.message.red);
    lineBreak();
  }
}



// ----------------------------------------------------------------------------------
//! 4: Добавляем КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function addContact(name, email, phone) {
  try {
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

    // //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
    // const data = await fs.readFile(contactsPath, 'utf8');
    // console.log("contacts.json:\n".yellow, data.blue); //!
    // console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
    // lineBreak();

    // //! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
    // const contactsParse = JSON.parse(data);
    // // console.log("СПИСОК КОНТАКТОВ:".yellow, contactsParse); //!+++
    // console.log("СПИСОК КОНТАКТОВ:".yellow); //!
    // console.table(contactsParse); //!
    // console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
    // lineBreak();

    // не здесь - ВНАЧАЛЕ!!! //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
    // const contactsParse = await listContacts();

    //!!! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
    const contactsParseNew = [...contactsParse, newContact]; //! 1-й вариант
    // contactsParse.push(newContact); //! 2-й вариант 
    // console.log("contactsParse:", contactsParse); //!+++ 2-й вариант (проверка)

    // console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow, contactsParseNew); //!+++
    console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
    console.table(contactsParseNew); //!+++ 1-й вариант
    console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParseNew).red); //! 1-й вариант
    // console.table(contactsParse); //!+++ //! 2-й вариант 
    // console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //! 2-й вариант 
    lineBreak();

    //! Вызываем ф-цию creatingNewJSONfile()  ==>
    //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    await creatingNewJSONfile(contactsParseNew); //!+++ 1-й вариант
    // await creatingNewJSONfile(contactsParse); //!+++ 2-й вариант


    // //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    // const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
    // console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
    // console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
    // lineBreak();

    // //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    // // await fs.writeFile('./db/contactsNEW.json', contactsParseNewStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
    // await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
    // // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
    // const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
    // console.log("НОВЫЙ JSON-файл --> contacts.json:\n".yellow, contactsNEWjson.blue); //!
    // lineBreak();

  } catch (error) {
    console.error(error.message.red);
    lineBreak();
  }
};


//* =========================================================================================
//* Проверяем работу каждой функции:
// listContacts();

// getContactById(4);

// removeContact(8);

// addContact("Test Contact", "Test.Contact@gmail.com", "(111) 222-334455");


//! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//! Экспорт функций
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact
}