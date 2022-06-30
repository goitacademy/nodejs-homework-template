
const { Contact } = require("../../models");
const addContact = async (req, res, next) => {
    res.status(201).json(
        await Contact.create({ ...req.body, owner: req.user.id })
    );
};

module.exports = addContact;