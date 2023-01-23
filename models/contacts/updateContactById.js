// const { boolean } = require("yargs");
const getAll = require("./getAll");
const updateContacts = require('./updateContacts');

const updateContactById = async (id, data) => {
    // отримуємо масив з об'єктами - контактами
    const contacts = await getAll();
    // в idx - записуємо індекс об'єкту що шукаємо по id
    const idx = contacts.findIndex(item => item.id === String(id));
   
    if (idx === -1) {
        return null;
    }
    

    // Створюємо пустй об'єкт
    const notNullData = {}
    // Отримуємо всі ключі - і отримуємо масив ключів ['name', 'phone', 'email']
    const keys = Object.keys(data);
    // console.log(`___keys______________${keys}`)
    // перебираємо ключі масиву
    for (let i = 0; i < keys.length; i++) {
        // console.log(`___data[keys[i]]____${data[keys[i]]}`)
        // console.log(`___keys[i]_____${keys[i]}`)
        // перевіряємо кожне значення ключа на true - чи щось ми змінили в ключі під час визову команди в терміналі (чи щось передали)
        if (data[keys[i]]) {
            // якщо true - тобто були якісь зміни - то в новий об'єкт до цієї властивості записуємо значення, що змінили
            notNullData[keys[i]] = data[keys[i]].toString();
            // console.log(`____notNullData[keys[i]]_____${notNullData[keys[i]]}`)
        }
    }
    // до об'єкту з потрібним індексом розпилюємо попередні значення з цоього об'єкту, і далі затираємо новими значеннями
    contacts[idx] = { ...contacts[idx], ...notNullData };
    await updateContacts(contacts);
    return contacts[idx];
}


module.exports = updateContactById;


// const getAll = require("./getAll");
// const updateContacts = require('./updateContacts');

// const updateContactById = async (id, data) => {
//     const contacts = await getAll();
//     // шукємо індекс контакту
//     const idx = contacts.findIndex(item => item.id === id);
//     // якщо такого id не має, то повернеться -1, і ми це відслідковуємо через if
//     if (idx === -1) {
//         return null;
//     }
//     contacts[idx] = { ...data, id };
//     await updateContacts(contacts);
//     return contacts[idx];
 
// }

// module.exports = updateContactById;