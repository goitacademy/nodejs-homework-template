const { updateContact } = require("../../service/contacts/contactsService");


const updateContactByIdController = async (req, res, next) => {
    const { _id: owner } = req.user;

    const updatedContact = await updateContact(req.params.contactId, req.body, owner);
        if (!updatedContact) {
            res.status(404).json({ "message": `Contact with id ${req.params.contactId} wasn't  found` });

        }
    res.status(200).json(updatedContact);

};

module.exports = { updateContactByIdController };