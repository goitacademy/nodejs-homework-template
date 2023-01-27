const getAll = require("./getAll");
const updateContacts = require('./updateContacts');

const removeContactById = async (id) => {
    const contacts = await getAll();
    const idx = contacts.findIndex(item => item.id === String(id));
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
    
}
module.exports = removeContactById;



// const getAll = require("./getAll");
// const updateContacts = require('./updateContacts');

// const removeContactById = async (id) => {
//     const contacts = await getAll();
//     const idx = contacts.findIndex(item => item.id === id);
//     if (idx === -1) {
//         return null;
//     }
//     // видаляємо потрібний контакт методом splice, яки повертає масив з видаленим елементом,
//     // тому деструктуризуємо removeContact і робимо його return
//     const [removeContact] = contacts.splice(idx, 1);
//     await updateContacts(contacts);
//     return removeContact;
    
// }

// module.exports = removeContactById;