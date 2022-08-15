const { RequestError } = require('../../helpers');
const contactsOperation = require('../../models');

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const oneContact = await contactsOperation.getContactById(contactId);

        if (!oneContact) {
            throw RequestError(404, 'Not found');
        }

        res.json({ oneContact });
    } catch (error) {
        next(error)
    };
};

module.exports = getContactById;