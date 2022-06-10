const contacts = require('../../models');

const addContact = async (res, req) => {
   const result = await contacts.addContact(req.body);
   res.status(201).json(result);
}

module.exports = addContact; 