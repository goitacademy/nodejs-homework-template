const contacts = require("./contacts");

module.exports = {
    contacts,
}


// // Comments
// const contacts = require("./contacts");
// // в contacts зберігаємо увесь об'єкт функцій-контролерів для запиту
// // так, в папці controllers може бути багато інших папок (крім contacts), наприклад: payments, products та ін.
// //  і ми так само функції контроллери з цих папок змогли б імпортувати сюди - загальний файл index.js,
// // який приймає об'єкти різних контроллерів за призначенням
// module.exports = {
//     contacts,
// }