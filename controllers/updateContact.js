const contacts = require('../models/contacts');

 const updateContact  = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw res.status(404).json({ message: "Not found" });
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }


  module.exports  = updateContact;