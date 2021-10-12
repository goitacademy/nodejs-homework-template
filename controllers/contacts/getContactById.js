const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, '_id name email phone favorite');
    if (!result) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = getContactById;