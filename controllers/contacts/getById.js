const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contacts');

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
}

module.exports = getById;
