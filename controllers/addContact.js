 const contacts = require('../models/contacts')
 const addContact = async (req, res, next) => {
    try {
      const result = await contacts.addContact(req.body);
     console.log("Contact added!");
    res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  module.exports = addContact;