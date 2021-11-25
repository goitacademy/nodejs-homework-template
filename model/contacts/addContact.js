const updateContacts = require('./updateContacts')
const getAll = require('./getAll')

const addContact = async ({name, email, phone}) => {
    const contacts = await getAll();
    const newContact = {id: new Date().getTime(), name, email,phone}
    contacts.push(newContact)
    await updateContacts(contacts);
    return newContact;
}

module.exports = addContact