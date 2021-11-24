const contactsOperations = require('../../model/index');

const removeById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsOperations.removeContact(contactId);

        if (!result) {
            const err = new Error(`not found ${contactId}`);
            err.status = 404;
            throw err;
        }
        res.json({ message: 'contact deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = removeById;