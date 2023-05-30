const contacts = require('../models/contacts')

 const deleteContact =  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        throw res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  module.exports = deleteContact