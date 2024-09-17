const Contacts = require('../../models/contact/contactsSchema')

const updateStatus = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    
 if (!req.body) return res.status(400).json({ "message": "missing fields favorite" });
    
    
    const { contactId } = req.params;

    const updatedStatusContact = await Contacts.findByIdAndUpdate(contactId, { favorite: favorite }, { new: true });

    if (!updatedStatusContact) return res.status(404).json({ "message": "Not found" });
     

    res.status(200).json({
    updatedStatusContact,
    });
  } catch (err) {
   next(err);
}
}

module.exports = updateStatus;