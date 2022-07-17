const {NotFound} = require("http-errors");

const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
        throw NotFound(`Product with id=${ contactId } not found`);
    };
    res.status(200).json({
        status: 'success',
        code: 200,
        result
    });
};

module.exports = removeContact;
