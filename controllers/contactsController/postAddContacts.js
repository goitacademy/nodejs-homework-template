const { contactsOperations } = require('../../models');

async function addContacts(req, res, next) {
    try {
        const result = await contactsOperations.addContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = addContacts;