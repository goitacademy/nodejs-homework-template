const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

module.exports = getContactById;