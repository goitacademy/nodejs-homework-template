const operations = require("../models/contacts");
const { RequestError } = require('../helpers');

const getById = async (req, res, next) => {
    try {
        const contact = await operations.getContactById(req.params.contactId);
        if (!contact) {
            throw RequestError(404, 'Not found');
        }
        res.json(contact);
    }
    catch (err) {
        next(err);
    }
}

module.exports = getById;
