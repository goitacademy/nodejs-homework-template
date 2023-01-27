
const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const removeContactById = require("./removeContactById");

module.exports = {
    getAll,
    getById,
    addContact,
    updateContactById,
    removeContactById,
}


// // В index.js ми імпортуємо усі операції над контактами, щоб зробити реекспорт всіх операцій одним об'єктом
// // до файлу contacts.js (const contactsOperations = require('./db') - вказавши тільки назву папки - 
// // ('./db') - і програма автоматично буде шукати всі операції в кореневому файлі - index.js
// const getAll = require("./getAll");
// const getById = require("./getById");
// const addContact = require("./addContact");
// const updateContactById = require("./updateContactById");

// module.exports = {
//     getAll,
//     getById,
//     addContact,
//     updateContactById,
// }

