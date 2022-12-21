const contactsOperations = require('../../models/contacts');

const get = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts()
        res.json({
            status: 'success',
            code: 200,
            result: {
                contacts
            },
        })
    } catch (error) {
        next(error);
    }
};

module.exports = get;