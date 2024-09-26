const operations = require("../models/contacts");
const { RequestError } = require('../helpers');
const { addSchema } = require('../schemas/schema')

const updateById = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw RequestError(400, error.message)
        }
        const { contactId: id } = req.params;
        const contact = await operations.updateById(id, req.body);
        if (!contact) {
            throw RequestError(404, 'Not found');
        }
        res.status(201).json(contact);
    } catch (err) {
        next(err);
    }
}

module.exports = updateById;