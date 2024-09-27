const contacts = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const { contactsSchema } = require('../../schemas/contacts');

const updateById = async(req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "missing fields")
        }
        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            throw RequestError(404, "Not found")
        }
        res.json(result)
    } catch (error) {
        next(error)
    }
};

module.exports = updateById;