const Contact = require('../../models/contacts/schemaContact');

const removeContact = async(req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findByIdAndRemove({ _id: contactId });
        if (contact) {
            return res
                .status(200)
                .json({ status: 'success', code: 200, payload: { contact } });
        }
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact by id:${contactId}`,
            payload: 'Not Found',
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = removeContact;