const { AppError, updateContactValidator } = require('../../utils');
const Contact = require('../../models/contactModel');

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { error, value } = updateContactValidator(req.body);

        if (error) {
            return next(new AppError(404, error.details[0].message));
        }

        if (Object.keys(value).length === 0) {
            return next(new AppError(400, 'Missing fields'));
        }

        const contact = await Contact.findByIdAndUpdate(contactId, value, {
            new: true,
        });

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
