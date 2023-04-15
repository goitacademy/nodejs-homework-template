const { addContact } = require("../../service/contacts/contactsService");


const addNewContactController = async (req, res, next) => {
    const { _id: owner } = req.user;

    const newContact = await addContact(req.body, owner);
    
    res.status(201).json(newContact);
};

module.exports = { addNewContactController };