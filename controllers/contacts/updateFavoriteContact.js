const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const updateFavoriteContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (result) {
        throw new NotFound(`Contact with id=${contactId} not found`);
    }
    sendSuccessRes(res, result, 200, 'Contact has been successfully updated')
};

module.exports = updateFavoriteContact;