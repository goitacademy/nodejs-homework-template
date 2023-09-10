const { Contact } = require('../../models/contacts');
const{ HttpError} = require('../../helpers');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await (Contact.findById(contactId));
    
    if (!contact) {
        throw HttpError(404, 'Not found');
    }
    res.json(contact)
};

module.exports = getContactById;