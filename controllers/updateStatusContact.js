const { RequestError } = require('../helpers');
const { Contact, schemas } = require('../models/contact')

const updateStatusContact = async (req, res, next) => {
    const { error } = schemas.updayeFavFieldSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message)
    }
    const { contactId: id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!contact) {
        throw RequestError(404, 'Not found');
    }
    res.status(201).json(contact);
}

module.exports = updateStatusContact;