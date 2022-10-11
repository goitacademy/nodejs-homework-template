const {Contact} = require('../../models/contact');

const updateStatusContact = async (req, res) => {
   const { _id } = req.user;
   const {contactId} = req.params;

   const {favorite} = req.body;
   const updateContact = await Contact.findByIdAndUpdate( { owner: _id, _id: contactId }, {favorite}, {new: true});
   if(updateContact) {
   res.status(200).json(updateContact);
} else {
   res.status(404).json({ message: 'Not found' });
}

};

module.exports = updateStatusContact;