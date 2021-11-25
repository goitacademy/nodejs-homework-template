const contactsOperations = require('../../model/contacts/index');

const getId = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsOperations.getContactById(contactId);

        if (!result) {
            const err = new Error(`not found ${contactId}`);
            err.status = 404;
            throw err;
        }
        res.json({ data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = getId;