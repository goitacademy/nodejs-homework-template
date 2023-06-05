const Contact = require('../models/contact')

const addContact = async (req, res, next) => {
   try {
     const result = await Contact.create(req.body);
    console.log("Contact added!");
   res.status(200).json(result);
   } catch (error) {
     next(error);
   }
 };

  module.exports = addContact;