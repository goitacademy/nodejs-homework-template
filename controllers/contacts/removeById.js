const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contacts');

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: 'contact deleted',
        data: {
            result
        }
    });
}

module.exports = removeById;