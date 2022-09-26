const contacts = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");
const { RequestError } = require("../../helpers");

const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);

    if (error) {
        throw RequestError(400, error.message);
    };

    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
};

module.exports = addContact;