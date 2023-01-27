const { v4 } = require("uuid");
const getAll = require('./getAll');
const updateContacts = require('./updateContacts');

// const addContact = async (data) => {
//     const contacts = await getAll();
//     const newContact = { id: v4(), ...data };
//     contacts.push(newContact);

const addContact = async ({ name, email, phone }) => {
    const contacts = await getAll();
    // const newContact = { name: String(name), email: String(email), phone: String(phone), id: v4() };
     const newContact = { name, email, phone: String(phone), id: v4() };
    contacts.push(newContact);
    

    await updateContacts(contacts);
    return newContact;
    
}

module.exports = addContact;



// Explanations===
// const { v4 } = require("uuid");
// const getAll = require('./getAll');

// const updateContacts = require('./updateContacts');

// const addContact = async (data) => {
//     // await await - необхідно для того, щоб дії відбувались поступово (в змінну contacts заипшеться весь
//     // список контактів тільки при виклиці функції getAll)
//     const contacts = await getAll();
//     // новий контакт - це data - name, email, phone та додаємо id через npm uuid
//     const newContact = { ...data, id: v4() };
//     // додали новий контакт в об'єкт, але contacts.json не оновився
//     contacts.push(newContact);
//     // використовуємо саме writeFile, оскыльки вын перезапише наш contacts.json
//     // appendFile - додасть новий контакт до contacts.json, але зробить це
//     // за квадратними дужками (тобто додасть просто у кынець файлу) - що неприйнятно в даній ситуації
    
//     // // тому використовуэмо writeFile, вказуємо шлях до файлу, який потрібно перезаписати,
//     // // та приводимо наш об'єкт до строки - формату JSON-файла
//     // await fs.writeFile(filePath, JSON.stringify(contacts));
//     await updateContacts(contacts);
//     return newContact;
    

   
// }

// module.exports = addContact;