const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const ownerId = req.user._id;

    const result = await Contact.findById(contactId, '_id name email phone favorite owner');
    console.log(result);
    if (!result || ownerId.toString() !== result.owner.toString()) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = getContactById;