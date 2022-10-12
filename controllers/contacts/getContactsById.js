const {Contact} = require('../../models/contact')

const getContactsById = async (req, res) => {
   const { _id } = req.user;
   const {contactId} = req.params;
   const contact = await Contact.findById({ owner: _id, _id: contactId },
      '-createdAt -updatedAt');
   if(!contact) {
return res.status(404).json({ message: 'Not found' });  
   }
   res.status(200).json(contact);
};

module.exports = getContactsById;