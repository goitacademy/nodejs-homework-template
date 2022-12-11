const Contact = require("../../models/contacts");

// const HttpError = require("../../helpers");
// const {addSchema} = require("../../schemas/contacts")

const addContact = async (req, res) => {

    const result = await Contact.create(req.body);
    res.status(201).json(result);
 
}

module.exports = addContact;