const { AppError } = require('../../utils');
const contactsOperation = require('../../models/contacts');

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { body } = req;

        if (Object.keys(body).length === 0) {
            return next(new AppError(400, 'Missing fields'));
        }

        const contact = await contactsOperation.updateContact(contactId, body);

        if (!contact) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json({
            result: contact,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = update;
