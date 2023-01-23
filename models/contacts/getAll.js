const fs = require("fs/promises");
const filePath = require('./filePath');

const getAll = async () => {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
} 

module.exports = getAll;

// // оскільки потрібно буде зчитувати файл, імпортуємо сюди fs-модуль (для роботи з файлами)
// const fs = require("fs/promises");
// const filePath = require('./filePath');

// const getAll = async () => {
//     // в data ми отримуємо дані з contacts.json у вигляді буферу
//     const data = await fs.readFile(filePath);
//     // далі робимо парс нашого буферу, щоб отримати дані у вигляді масиву об'єктів
//     const contacts = JSON.parse(data);
//     return contacts;
// } 

// module.exports = getAll;