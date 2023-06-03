const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const addContact = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing required field");
    }
    const result = await Contact.create({...req.body});

    res.status(201).json(result);
};

module.exports = addContact;