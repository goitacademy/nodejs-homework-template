const { Contact } = require("../../models/contacts");

const addContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const body = req.body;
        const newContact = await Contact.create({ ...req.body, owner });
        res.status(201).json(newContact);
    } catch (error) {
          next(error);
    }
}

module.exports = addContact;