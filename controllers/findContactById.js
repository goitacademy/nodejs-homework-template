const contacts = require('../models/contacts');

  const findContactById = async(req,res,next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
    
        if (!result) {
          throw res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
  }

  module.exports = findContactById;