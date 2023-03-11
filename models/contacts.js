const fs = require('fs/promises')
const path = require('path');


const contactsPath = path.resolve(__dirname, 'contacts.json');


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);
    return contacts;

}


const getById = async (id) => {
    try {
        const contacts = await listContacts();
        const result = contacts.filter(contact => contact.id === id); // find возвращает первый успешно найденный обект  //filter создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции
        console.log(result)
        if (result.length === 0) {
            return null;
        }
        return result;
    } catch (error) {
        console.log(error.message);
    }
};


const removeContact = async (contactId) => {
}

const addContact = async (body) => {
}

const updateContact = async (contactId, body) => {
}

module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
}
