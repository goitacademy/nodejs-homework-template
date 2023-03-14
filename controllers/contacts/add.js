const contactsOperation = require('../../models/contacts');
const { AppError } = require('../../utils');
const { contactSchema } = require('../../utils');

const add = async (req, res, next) => {
    try {
        const { error, value } = contactSchema(req.body);

        if (error) {
            return next(new AppError(404, error.details[0].message));
        }

        const addContact = await contactsOperation.addContact(value);

        res.status(201).json({
            result: addContact,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = add;
