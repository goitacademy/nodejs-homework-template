const {Contact} = require('../../models/contact');

const removeContact = async (req, res) => {
   const { _id } = req.user;
   const {contactId} = req.params; 
   const removeContact = await Contact.findByIdAndRemove({owner: _id, _id: contactId});
   if(removeContact) {
   res.status(200).json({ message: 'contact deleted' });   
   } else {
      res.status(404).json({ message: 'Not found' });
   }
   
   };

   module.exports = removeContact;