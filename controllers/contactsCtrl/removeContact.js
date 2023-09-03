const { Contact} = require('../../models/contacts');
const{ HttpError} = require('../../helpers');

const removeContact = async (req, res, next) => {
  
    const { contactId } = req.params; 
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, 'Not Found')
    }
    res.status(200).json({ message: 'The contact was deleted succesfully' })

};

module.exports = removeContact;