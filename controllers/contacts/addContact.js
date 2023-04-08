const contacts = require('../../models/contacts')

const addContact = async(req,res) => {

    const result = await contacts.addContact(req.body);
    res.json(result);
}

module.exports = addContact;