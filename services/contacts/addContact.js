const contactsOperations = require('../../models/contacts')

const addContact = async (body) => {
    try {
        const data = await contactsOperations.addContact(body);
        return data
    } catch (err) {
        console.log(err.message);
    };
};

module.exports = addContact;