
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");

module.exports = filePath;



// // для роботи зі шляхами в Node.js використовуємо інтегрований модуль path
// const path = require("path");
// // створюємо змінну filePath для склеювання шляхів (для коректної роботи на різних р=оперю системах) - 
// // тобто сам проставляє слеші та нормадізує шлях
// // де dirname - шлях до папки, дн знаходиться потрібний файл; contacts.json - той файл, з яким потрібно працювати
// const filePath = path.join(__dirname, "contacts.json");

// module.exports = filePath;