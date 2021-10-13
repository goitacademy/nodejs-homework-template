const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const updateFavoriteContact = async (req, res) => {
    const ownerId = req.user._id;
    const { contactId } = req.params;
    const { favorite } = req.body;
    
    const contact = await Contact.findById(contactId);
    
    if (!contact || ownerId.toString() !== contact.owner.toString()) {
        throw new NotFound(`Contact with id=${contactId} not found`);
    }
    
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    sendSuccessRes(res, result, 200, 'Contact has been successfully updated')
};

module.exports = updateFavoriteContact;