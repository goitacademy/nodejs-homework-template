const { Contact, schemas } = require('../models/contact');
const { RequestError } = require('../helpers');

const add = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        throw RequestError(400, error.message)
    }
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
}

module.exports = add;