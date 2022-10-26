const RequestError = require('../../helpers/RequestError');
const Contact = require('../../models/contact');

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId, "-createdAt -updatedAt");
    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}

module.exports = getById;