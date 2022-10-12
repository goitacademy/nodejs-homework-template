const { Contact } = require('../../models/contact')
const { RequestError } = require('../../helpers');

const getById = async (req, res, next) => {
    // const contact = await Contact.findOne({ _id: req.params.contactId });
    const contact = await Contact.findById(req.params.contactId);

    if (!contact) {
        throw RequestError(404, 'Not found');
    }
    res.json(contact);
}

module.exports = getById;
