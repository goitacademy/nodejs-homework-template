const {v4, v3} = require("uuid");

const listContacts = require("./listContacts");
const update = require("./update");

// const addContact = async (body) => {
//     try {
//         const newContact = { ...body, id: v4() }
//         const contacts = await listContacts();
//         await update(contacts);
//         return newContact;
//     }
//     catch (error) {
//         throw error
//     }
// }

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: v4(),
            name: '',
            email: '',
            phone: ''
        }
        const newContacts = [...contacts, newContact];
        await update(newContacts)
        return newContact
    }
    catch (error) {
        throw error
    }
}

module.exports = addContact;