const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { message: `Contact with ${contactId} id was deleted.` });
};

module.exports = removeContact;