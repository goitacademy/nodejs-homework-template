const {Contact} = require('../../models/contact');

const updateContact = async (req, res) => {
   const { _id } = req.user;
   const {contactId} = req.params;
   const {body} = req;
   const updateContact = await Contact.findByIdAndUpdate({ owner: _id, _id: contactId }, body, {new: true, fields: ['-createdAt', '-updatedAt']}, );
   if(updateContact) {
   res.status(200).json(updateContact);
} else {
   res.status(404).json({ message: 'Not found' });
}
};

module.exports = updateContact;