const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

module.exports = updateStatusContact;