const Contacts = require('../../models/contact/contactsSchema')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
 
    const contactToId = await Contacts.findById(contactId);
    
  if (!contactToId) {
      return res.status(404).json({
        "message": "Not found"
      });
    }  
  res.status(200).json({
    contactToId,
  });
} catch (err) {
  next(err);
}
}

module.exports = getById;