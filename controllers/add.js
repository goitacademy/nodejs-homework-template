const operations = require("../models/contacts");
const { RequestError } = require('../helpers');
const { addSchema } = require('../schemas/schema');

const add = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        console.log(req.body);
        if (error) {
            throw RequestError(400, error.message)
        }
        const contact = await operations.addContact(req.body);
        res.status(201).json(contact);
    } catch (err) {
        next(err);
    }
}

module.exports = add;