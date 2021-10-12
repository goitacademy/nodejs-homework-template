const { NotFound } = require('http-errors');
const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const updateFavoriteStatus = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const ownerId = req.user._id;

    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result || ownerId.toString() !== result.owner.toString()) {
        throw new NotFound(`Contact with ${contactId} id was not found`);
    }
    sendSuccessfulRes(res, { result });
};

module.exports = updateFavoriteStatus;