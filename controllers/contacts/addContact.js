const contactsOperations = require("../../models/contacts");

const addContact = async (req, res, next) => {
    try {
        const result = await contactsOperations.addContact(req.body);

        res.status(201).json(
            result
        );
    } catch (error) {
        next(error);
    }
}

module.exports =addContact;