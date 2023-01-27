const fs = require("fs/promises");
const filePath = require('./filePath');

// функція, що отримує масив контактів і приводить його до JSON-формату
const updateContacts = async (contacts) => {
      await fs.writeFile(filePath, JSON.stringify(contacts));
}

module.exports = updateContacts;



// // імпортуємо сюди модуль fs, оскільки потрібно буде змінювати початковий contacts.json файл, а відповідно
// // використати один із методів fs - writeFile
// const fs = require("fs/promises");
// const filePath = require('./filePath');

// // функція, що отримує масив контактів і приводить його до JSON-формату
// const updateContacts = async (contacts) => {
//       await fs.writeFile(filePath, JSON.stringify(contacts));
// }

// module.exports = updateContacts;