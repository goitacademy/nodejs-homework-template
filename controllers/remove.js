const operations = require("../models/contacts");
const { RequestError } = require('../helpers');

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await operations.removeContact(contactId);
        if (!contact) {
            throw RequestError(404, 'Not found');
        }
        res.json({
            message: 'Contact removed successfully!'
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = remove;