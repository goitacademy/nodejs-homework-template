const contacts = require('../models/contacts');

const addContact = async (res, req) => {
   const result = await contacts.add(req.body);
   res.status(201).json(result);
}

module.exports = addContact;