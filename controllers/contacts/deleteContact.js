const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteContact = async (req, res, next) => { 
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json({
        message: "Contact deleted"
    })
};

module.exports = deleteContact;
