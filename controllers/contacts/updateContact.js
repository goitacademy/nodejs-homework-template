const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const ownerId = req.user._id;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result || ownerId.toString() !== result.owner.toString()) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = updateContact;