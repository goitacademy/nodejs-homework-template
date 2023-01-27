const getAll = require('./getAll');

const getById = async (id) => {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === String(id));
    if (!result) {
        return null;
    }
    return result;
}

module.exports = getById;




// // По факту нам потрібний увесь список контактів, щоб знайти один потрібний
// // можна по аналагії з getAll.js спочатку імпортувати fs-модуль, потім імпортувати path-модуль -
// // щоб відповідно зробити операції пошуку файлів та уточнення шляху до файлу відповідно.
// // А можна простіше - просто взати результат виклику функції для всіх файлів, і вже там знайти необхідний по id
// const getAll = require('./getAll');

// const getById = async (id) => {
//     const contacts = await getAll();
//     const result = contacts.find(item => item.id === id);
//     // якщо буде якась помилка чи не буде даного id потрібно записати так
//     if (!result) {
//         return null;
//     }
//     return result;
// }

// module.exports = getById;